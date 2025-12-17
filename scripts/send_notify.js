(async () => {
  const fetch = globalThis.fetch || ((await import('node-fetch')).default);
  const crypto = await import('crypto');
  const payload = {
    m_payment_id: 'preorder_1765973073959',
    amount: '0.00',
    item_name: 'Test Item',
    payment_status: 'COMPLETE'
  };

  const keys = Object.keys(payload).filter(k => payload[k] !== undefined && payload[k] !== null && payload[k] !== '').sort();
  const pieces = keys.map(k => `${k}=${encodeURIComponent(String(payload[k]).replace(/\+/g, '%2B'))}`);
  const signedString = pieces.join('&');
  const md5 = crypto.createHash('md5').update(signedString).digest('hex');
  payload.signature = md5;

  console.log('Sending notify with signature', md5);

  const res = await fetch('http://localhost:3002/api/payfast/notify', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(payload).toString() });
  console.log('Status', res.status);
  const text = await res.text();
  console.log('Body:', text);
})();
