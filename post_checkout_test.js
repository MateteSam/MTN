(async () => {
  try {
    const url = 'http://localhost:3002/api/payfast/checkout';
    const payload = {
      amount: '545',
      item_name: 'Print First Edition',
      custom_quantity: '2',
      shipping: { line1: '1 Main', city: 'Johannesburg', region: 'Gauteng', country: 'South Africa', code: '2001' }
    };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    console.log('Status', res.status);
    const text = await res.text();
    console.log('Body (first 500 chars):\n', text.slice(0, 500));
  } catch (err) {
    console.error(err);
  }
})();
