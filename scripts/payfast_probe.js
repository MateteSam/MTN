import https from 'https';
import { URLSearchParams } from 'url';
import crypto from 'crypto';

(async () => {
  try {
    // Replace these with your values from .env.local or environment
    const merchant_id = process.env.PAYFAST_MERCHANT_ID || '32969993';
    const merchant_key = process.env.PAYFAST_MERCHANT_KEY || '9adj4weeiipdp';
    const passphrase = process.env.PAYFAST_PASSPHRASE || '';

    const params = {
      merchant_id,
      merchant_key,
      amount: '545.00',
      item_name: 'Print First Edition',
      return_url: 'https://300millionconnections.store/payment-success',
      cancel_url: 'https://300millionconnections.store/payment-cancel',
      notify_url: 'https://300millionconnections.store/api/payfast/notify',
      m_payment_id: `probe_${Date.now()}`
    };

    // Build signature (sort keys alphabetically, URL-encode, replace spaces with '+')
    const ordered = Object.keys(params).sort().map((k) => `${k}=${encodeURIComponent(params[k]).replace(/%20/g, '+')}`).join('&');
    const signatureString = passphrase ? `${ordered}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}` : ordered;
    const signature = crypto.createHash('md5').update(signatureString).digest('hex');

    params.signature = signature;

    const body = new URLSearchParams(params).toString();

    const options = {
      hostname: 'sandbox.payfast.co.za',
      path: '/eng/process',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent': 'payfast-probe/1.0'
      }
    };

    console.log('Submitting to PayFast sandbox with merchant_id', merchant_id);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        // Print a trimmed preview of body
        console.log('Body (first 800 chars):\n', data.slice(0, 800));
      });
    });

    req.on('error', (err) => {
      console.error('Request error', err);
    });

    req.write(body);
    req.end();
  } catch (err) {
    console.error('Probe error', err);
  }
})();
