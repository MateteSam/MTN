import http from 'http';
import { URL, URLSearchParams } from 'url';
import crypto from 'crypto';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// Determine public front-end and public API URLs for sandbox E2E testing.
// Support two env vars: PUBLIC_URL_FRONTEND (frontend URL) and PUBLIC_URL_API (API URL).
let FRONTEND_ORIGIN = process.env.PUBLIC_URL_FRONTEND || process.env.PUBLIC_URL || `http://localhost:3000`;
let PUBLIC_API_ORIGIN = process.env.PUBLIC_URL_API || process.env.PUBLIC_URL || `http://localhost:${PORT}`;

// Auto-detect local frontend origin on typical dev ports if neither PUBLIC_URL_FRONTEND nor PUBLIC_URL is set
(async function detectFrontendOrigin() {
  try {
    if (!process.env.PUBLIC_URL_FRONTEND && !process.env.PUBLIC_URL) {
      const http = await import('http');
      for (let p = 3000; p <= 3010; p++) {
        const ok = await new Promise((resolve) => {
          const req = http.request({ hostname: '127.0.0.1', port: p, path: '/test-payfast.html', method: 'HEAD', timeout: 250 }, (res) => {
            resolve(res.statusCode && res.statusCode < 400);
          });
          req.on('error', () => resolve(false));
          req.on('timeout', () => { req.destroy(); resolve(false); });
          req.end();
        });
        if (ok) {
          FRONTEND_ORIGIN = `http://localhost:${p}`;
          console.log(`[dev-api] detected frontend origin ${FRONTEND_ORIGIN}`);
          break;
        }
      }
    }
    // Also set PUBLIC_API_ORIGIN from PUBLIC_URL_API if provided
    if (process.env.PUBLIC_URL_API) {
      PUBLIC_API_ORIGIN = process.env.PUBLIC_URL_API;
    }
  } catch (err) {
    // detection failed; will fall back to PUBLIC_URL or http://localhost:3000
  }
})();

import zlib from 'zlib';

function sendHtml(res, html, status = 200) {
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

async function sendJson(req, res, obj, status = 200) {
  const body = JSON.stringify(obj);
  try {
    const accept = (req.headers['accept-encoding'] || '');
    if (accept.includes('gzip')) {
      const gz = zlib.gzipSync(body);
      res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Encoding': 'gzip' });
      return res.end(gz);
    }
  } catch (err) {
    // fall back to uncompressed
  }
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(body);
}

function buildPayfastForm({ amount = '0.00', item_name = 'Test Item', merchant_id = '10000100', merchant_key = '46f0cd694581a' } = {}) {
  // This builds a simple PayFast sandbox form for local testing.
  const origin = FRONTEND_ORIGIN || process.env.PUBLIC_URL || `http://localhost:3000`;
  const notifyBase = PUBLIC_API_ORIGIN || process.env.PUBLIC_URL || `http://localhost:${PORT}`;
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

      console.log('[dev-api] env PAYFAST_MERCHANT_ID:', JSON.stringify(process.env.PAYFAST_MERCHANT_ID));
      console.log('[dev-api] env PAYFAST_MERCHANT_KEY:', JSON.stringify(process.env.PAYFAST_MERCHANT_KEY));

      const amountVal = (parseFloat(String(data.amount || data.total || '0')) || 0).toFixed(2);
      const itemNameVal = data.item_name || data.description || 'Test Item';

      const simulate = (process.env.NODE_ENV !== 'production') || !process.env.PAYFAST_MERCHANT_ID || process.env.DEV_PAYFAST_SIMULATE === '1' || process.env.DEV_PAYFAST_SIMULATE === 'true';
      console.log('[dev-api] checkout simulate mode:', simulate);

      if (simulate) {
        // For local testing without valid PayFast credentials, create an order and return an inline test page
        const m_payment_id = `preorder_${Date.now()}`;
        try {
          const orders = await import('../lib/orders.js');
          await orders.createOrder({ m_payment_id, amount: amountVal, item_name: itemNameVal, status: 'pending' });
        } catch (err) {
          console.warn('Could not persist order locally', err);
        }

        // Build an inline test page (no reliance on a separate static server)
        const params = {
          merchant_id: merchant_id || '',
          merchant_key: merchant_key || '',
          amount: amountVal,
          item_name: itemNameVal,
          return_url: FRONTEND_ORIGIN + '/payment-success?m_payment_id=' + encodeURIComponent(m_payment_id),
          cancel_url: FRONTEND_ORIGIN + '/payment-cancel?m_payment_id=' + encodeURIComponent(m_payment_id),
          notify_url: (PUBLIC_API_ORIGIN || `http://localhost:${PORT}`) + '/api/payfast/notify',
          m_payment_id
        };

        const inputs = Object.entries(params).map(([k, v]) => `<input type="hidden" name="${k}" value="${String(v).replace(/\"/g, '&quot;')}"/>`).join('\n');
        const noMerchantWarn = !params.merchant_id ? `<p style="color:crimson;font-weight:600">No merchant_id supplied — use "/api/payfast/checkout" for secure tests that don't expose keys in the client.</p>` : '';

        const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>PayFast Test Page (inline)</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:24px;color:#111;background:#fff} .panel{max-width:800px;margin:0 auto;padding:24px;border:1px solid #ddd;border-radius:8px}</style>
  </head>
  <body>
    <div class="panel">
      <h1>PayFast Test Redirect</h1>
      <p>This inline page simulates a PayFast checkout response from the server (safe for local testing).</p>
      ${noMerchantWarn}
      <form id="pf" action="https://sandbox.payfast.co.za/eng/process" method="post">
        ${inputs}
        <button type="submit">Submit to PayFast (sandbox)</button>
      </form>
    </div>
  </body>
</html>`;

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
      const pieces = keys.map(k => `${k}=${encodeURIComponent(String(payload[k]).trim()).replace(/%20/g, '+')}`);
      let signedString = pieces.join('&');
      if (passphrase) signedString += `&passphrase=${encodeURIComponent(passphrase)}`;
      const md5 = crypto.createHash('md5').update(signedString).digest('hex');

      console.log('[dev-api] Debug Signature:');
      console.log('  Received:', signature);
      console.log('  Calculated:', md5);
      console.log('  SignedString:', signedString);

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
        const orders = await import('../lib/orders.js');
        const list = await orders.readOrders ? await orders.readOrders() : [];
        return sendJson(req, res, list, 200);
      } catch (err) {
        return sendJson(req, res, { error: 'Could not read orders' }, 500);
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
    const pieces = keys.map(k => `${k}=${encodeURIComponent(String(params[k]).trim()).replace(/%20/g, '+')}`);
    let signedString = pieces.join('&');
    if (passphrase) signedString += `&passphrase=${encodeURIComponent(passphrase)}`;
    const md5 = crypto.createHash('md5').update(signedString).digest('hex');
    return md5;
  } catch (err) {
    console.warn('signature error', err);
    return '';
  }
}
