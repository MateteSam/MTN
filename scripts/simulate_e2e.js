(async () => {
  const fetch = globalThis.fetch || (await import('node-fetch')).default;
  const crypto = await import('crypto');

  const checkoutUrl = 'http://localhost:3002/api/payfast/checkout';
  const notifyUrl = 'http://localhost:3002/api/payfast/notify';
  const ordersUrl = 'http://localhost:3002/api/dev/orders';

  try {
    console.log('Posting checkout...');
    const checkoutResp = await fetch(checkoutUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: '545', item_name: 'Print First Edition', custom_quantity: '1' }) });
    const text = await checkoutResp.text();
    console.log('Checkout status', checkoutResp.status);
    // try to extract m_payment_id from body
    const m = text.match(/m_payment_id=([^"'&>]+)/);
    let m_payment_id = null;
    if (m) {
      m_payment_id = decodeURIComponent(m[1]);
      console.log('Found m_payment_id in response:', m_payment_id);
    } else {
      const m2 = text.match(/name="m_payment_id" value="([^"]+)"/);
      if (m2) { m_payment_id = m2[1]; console.log('Found m_payment_id in form:', m_payment_id); }
    }

    if (!m_payment_id) {
      console.warn('Could not find m_payment_id in checkout response; aborting notify step');
      return;
    }

    // Build notify payload to mark as paid
    const payload = { m_payment_id, amount: '545.00', item_name: 'Print First Edition', payment_status: 'COMPLETE' };
    // compute signature the same way dev-api does
    const keys = Object.keys(payload).filter(k => payload[k] !== undefined && payload[k] !== null && payload[k] !== '').sort();
    const pieces = keys.map(k => `${k}=${encodeURIComponent(String(payload[k]).trim()).replace(/%20/g, '+')}`);
    let signedString = pieces.join('&');
    // include passphrase if present in env
    const passphrase = process.env.PAYFAST_PASSPHRASE || '';
    if (passphrase) signedString += `&passphrase=${encodeURIComponent(passphrase)}`;
    const md5 = crypto.createHash('md5').update(signedString).digest('hex');
    payload.signature = md5;

    console.log('Posting notify with signature:', md5);
    const notifyResp = await fetch(notifyUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(payload).toString() });
    console.log('Notify status', notifyResp.status);
    console.log('Notify body:', await notifyResp.text());

    // fetch orders
    const ordersResp = await fetch(ordersUrl, { method: 'GET' });
    console.log('Orders status', ordersResp.status);
    const ordersText = await ordersResp.text();
    console.log('Orders body:\n', ordersText);
  } catch (err) {
    console.error('simulate_e2e error', err);
  }
})();
