process.env.PORT = process.env.PORT || '3002';
(async () => {
  try {
    console.log('Importing dev-api server...');
    await import('./dev-api/server.js');
    console.log('Server module imported. Waiting 250ms for listen...');
    await new Promise(r => setTimeout(r, 250));

    const url = 'http://localhost:3002/api/payfast/checkout';
    const payload = { amount: '545', item_name: 'Print First Edition', custom_quantity: '2' };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    console.log('Status', res.status);
    const text = await res.text();
    console.log('Body (first 500 chars):\n', text.slice(0, 500));
  } catch (err) {
    console.error('Error in test flow', err);
  }
})();
