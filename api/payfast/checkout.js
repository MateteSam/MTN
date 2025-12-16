const crypto = require('crypto');

// Vercel / Netlify compatible function
// Environment variables required:
// PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE (optional)
// PAYFAST_MODE = 'sandbox' or 'live' (default: sandbox)

module.exports = async (req, res) => {
  try {
    const mode = (process.env.PAYFAST_MODE || 'sandbox').toLowerCase();
    const PAYFAST_URL = mode === 'live' ? 'https://www.payfast.co.za/eng/process' : 'https://sandbox.payfast.co.za/eng/process';

    const merchant_id = process.env.PAYFAST_MERCHANT_ID;
    const merchant_key = process.env.PAYFAST_MERCHANT_KEY;
    const passphrase = process.env.PAYFAST_PASSPHRASE || '';

    if (!merchant_id || !merchant_key) {
      res.status(500).send('Missing PAYFAST_MERCHANT_ID or PAYFAST_MERCHANT_KEY in environment');
      return;
    }

    // Support GET (query) or POST (JSON body)
    const isPost = req.method && req.method.toLowerCase() === 'post';
    const payload = isPost ? (req.body || {}) : req.query || {};
    const { amount = '0.00', item_name = 'Preorder' } = payload;

    // Build parameters required by PayFast
    const origin = (req.headers['x-forwarded-proto'] || 'https') + '://' + (req.headers['x-forwarded-host'] || req.headers.host);
    // Persist a local order record where possible (useful for local dev and staging)
    const m_payment_id = `preorder_${Date.now()}`;
    const notify_url = `${origin}/api/payfast/notify`;
    const return_url = `${origin}/payment-success?m_payment_id=${m_payment_id}`;
    const cancel_url = `${origin}/payment-cancel?m_payment_id=${m_payment_id}`;
    try {
      const orders = require('../../lib/orders');
      await orders.createOrder({ m_payment_id, amount: parseFloat(amount).toFixed(2), item_name, status: 'pending' });
    } catch (err) {
      console.warn('Could not persist order', err && err.message ? err.message : err);
    }

    const params = { m_payment_id,
      merchant_id: merchant_id,
      merchant_key: merchant_key,
      return_url,
      cancel_url,
      notify_url,
      name_first: '',
      name_last: '',
      email_address: '',
      amount: parseFloat(amount).toFixed(2),
      item_name: item_name,
    };

    // Create signature string (alphabetical order of key names)
    const ordered = Object.keys(params).sort().map((k) => `${k}=${encodeURIComponent(params[k]).replace(/%20/g, '+')}`).join('&');
    const signatureString = passphrase ? `${ordered}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}` : ordered;
    const signature = crypto.createHash('md5').update(signatureString).digest('hex');

    // Build HTML form that auto-submits to PayFast
    const formInputs = Object.keys(params).map((k) => `<input type="hidden" name="${k}" value="${params[k]}">`).join('\n');
    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Redirecting to PayFast</title>
  </head>
  <body>
    <form id="payfast_form" action="${PAYFAST_URL}" method="post">
      ${formInputs}
      <input type="hidden" name="signature" value="${signature}" />
    </form>
    <script>document.getElementById('payfast_form').submit();</script>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
