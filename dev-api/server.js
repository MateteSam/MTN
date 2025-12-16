import http from 'http';
import crypto from 'crypto';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

function sendHtml(res, html, status = 200) {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

function buildPayfastForm({ amount = '0.00', item_name = 'Test Item', merchant_id = '10000100', merchant_key = '46f0cd694581a' } = {}) {
  // This builds a simple PayFast sandbox form for local testing.
  const origin = process.env.PUBLIC_URL || `http://localhost:3000`;
  const notifyBase = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : `http://localhost:${PORT}`;
  const params = {
    merchant_id,
    merchant_key,
    amount,
    item_name,
    return_url: origin + '/payment-success',
    cancel_url: origin + '/payment-cancel',
    notify_url: notifyBase + '/api/payfast/notify',
  };

  // generate signature if passphrase is present in env
  const passphrase = process.env.PAYFAST_PASSPHRASE || '';
  const signature = makePayfastSignature(params, passphrase);
  if (signature) params.signature = signature;

  const inputs = Object.entries(params)
    .map(([k, v]) => `<input type="hidden" name="${k}" value="${String(v).replace(/\"/g, '&quot;')}"/>`)
    .join('\n');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>PayFast Test Redirect</title>
  </head>
  <body>
    <p>Preparing redirect to PayFast (sandbox). If nothing happens, click the button below.</p>
    <form id="payfast" action="https://sandbox.payfast.co.za/eng/process" method="post">
      ${inputs}
      <noscript>
        <button type="submit">Continue to PayFast</button>
      </noscript>
    </form>
    <script>document.getElementById('payfast').submit();</script>
  </body>
</html>`;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (url.pathname === '/api/payfast/checkout' && req.method === 'POST') {
      let body = '';
      for await (const chunk of req) body += chunk;
      let data = {};
      try {
        data = JSON.parse(body || '{}');
      } catch (err) {
        // try urlencoded
        const params = new URLSearchParams(body || '');
        params.forEach((v, k) => (data[k] = v));
      }

      const merchant_id = process.env.PAYFAST_MERCHANT_ID || '10000100';
      const merchant_key = process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a';

      const amountVal = data.amount || data.total || '0.00';
      const itemNameVal = data.item_name || data.description || 'Test Item';

      const simulate = !process.env.PAYFAST_MERCHANT_ID || process.env.DEV_PAYFAST_SIMULATE === '1' || process.env.DEV_PAYFAST_SIMULATE === 'true';

      if (simulate) {
        // For local testing without valid PayFast credentials, create an order and redirect to the local test page
        const m_payment_id = `preorder_${Date.now()}`;
        try {
          const orders = require('../lib/orders');
          await orders.createOrder({ m_payment_id, amount: amountVal, item_name: itemNameVal, status: 'pending' });
        } catch (err) {
          console.warn('Could not persist order locally', err);
        }

        const origin = process.env.PUBLIC_URL || 'http://localhost:3000';
        const qs = new URLSearchParams({ merchant_id, merchant_key, amount: amountVal, item_name: itemNameVal, return_url: origin + '/payment-success?m_payment_id=' + encodeURIComponent(m_payment_id), cancel_url: origin + '/payment-cancel?m_payment_id=' + encodeURIComponent(m_payment_id), notify_url: `http://localhost:${PORT}/api/payfast/notify`, m_payment_id }).toString();
        const redirectUrl = `${origin}/test-payfast.html?${qs}`;
        const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Redirecting</title></head><body><script>window.location='${redirectUrl}';</script><noscript><a href="${redirectUrl}">Continue to test page</a></noscript></body></html>`;
        return sendHtml(res, html, 200);
      }

      const html = buildPayfastForm({
        amount: amountVal,
        item_name: itemNameVal,
        merchant_id,
        merchant_key,
      });

      return sendHtml(res, html, 200);
    }

    if (url.pathname === '/api/payfast/notify' && req.method === 'POST') {
      // Dev notify handler: parse payload, verify signature (if passphrase set), and update order status
      let body = '';
      for await (const chunk of req) body += chunk;
      // body may be urlencoded
      const params = new URLSearchParams(body || '');
      const payload = {};
      params.forEach((v, k) => payload[k] = v);
      console.log('[dev-api] notify received payload:', payload);

      const passphrase = process.env.PAYFAST_PASSPHRASE || '';
      const signature = payload.signature || '';
      const keys = Object.keys(payload).filter(k => k !== 'signature' && payload[k] !== undefined && payload[k] !== null && payload[k] !== '').sort();
      const pieces = keys.map(k => `${k}=${encodeURIComponent(String(payload[k]).replace(/\+/g, '%2B'))}`);
      let signedString = pieces.join('&');
      if (passphrase) signedString += `&passphrase=${encodeURIComponent(passphrase)}`;
      const md5 = crypto.createHash('md5').update(signedString).digest('hex');

      if (!signature || signature !== md5) {
        console.warn('[dev-api] invalid notify signature', { expected: md5, received: signature });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('INVALID_SIGNATURE');
      }

      // update or create order record
      try {
        const orders = require('../lib/orders');
        const m_payment_id = payload.m_payment_id;
        if (m_payment_id) {
          const existing = await orders.getOrder(m_payment_id);
          if (existing) {
            await orders.updateOrderStatus(m_payment_id, 'paid', { raw_notify: payload });
            console.log('[dev-api] order marked paid', m_payment_id);
          } else {
            await orders.createOrder({ m_payment_id, amount: payload.amount || '0.00', item_name: payload.item_name || '', status: 'paid', meta: { raw_notify: payload } });
            console.log('[dev-api] order created and marked paid', m_payment_id);
          }
        }
      } catch (err) {
        console.warn('[dev-api] could not persist notify', err);
      }

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('OK');
    }

    if (url.pathname === '/api/payfast/checkout' && req.method === 'GET') {
      return sendHtml(res, `<h1>PayFast Dev API</h1><p>POST JSON to <code>/api/payfast/checkout</code> with <code>amount</code> and <code>item_name</code>.</p>`);
    }

    if (url.pathname === '/api/dev/orders' && req.method === 'GET') {
      try {
        const orders = require('../lib/orders');
        const list = await orders.readOrders ? await orders.readOrders() : [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(list, null, 2));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Could not read orders' }));
      }
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  } catch (err) {
    console.error('dev-api error', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error');
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`dev-api listening on http://localhost:${PORT}`);
});

export default server;

function makePayfastSignature(params, passphrase = '') {
  try {
    // Build string of sorted params (excluding empty values and signature)
    const keys = Object.keys(params).filter(k => params[k] !== undefined && params[k] !== null && params[k] !== '' && k !== 'signature').sort();
    const pieces = keys.map(k => `${k}=${encodeURIComponent(String(params[k]).replace(/\+/g, '%2B'))}`);
    let signedString = pieces.join('&');
    if (passphrase) signedString += `&passphrase=${encodeURIComponent(passphrase)}`;
    const md5 = crypto.createHash('md5').update(signedString).digest('hex');
    return md5;
  } catch (err) {
    console.warn('signature error', err);
    return '';
  }
}
