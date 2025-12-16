export interface CheckoutOptions {
  amount: string;
  item_name: string;
}

export const startCheckout = async ({ amount, item_name }: CheckoutOptions) => {
  // Open new window immediately so popup blockers allow it (user gesture)
  const newWindow = window.open('', '_blank');
  if (!newWindow) {
    alert('Popup blocked. Please allow popups for this site or try again.');
    return;
  }

  // Set initial loading state
  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redirecting to Payment...</title>
        <style>
          body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc; color: #334155; }
          .loader { border: 4px solid #e2e8f0; border-top: 4px solid #0f172a; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 1rem; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .content { text-align: center; }
        </style>
      </head>
      <body>
        <div class="content">
          <div class="loader" style="margin: 0 auto 1rem;"></div>
          <p>Securely redirecting to PayFast...</p>
        </div>
      </body>
    </html>
  `);

  try {
    const resp = await fetch('/api/payfast/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: amount.replace(/[^0-9.]/g, ''), 
        item_name 
      })
    });

    const html = await resp.text();

    if (!resp.ok) {
      // fallback to local test page for offline/local testing
      const qs = new URLSearchParams({ 
        amount: amount.replace(/[^0-9.]/g, ''), 
        item_name 
      }).toString();
      newWindow.location = `/test-payfast.html?${qs}`;
      return;
    }

    // success — write the PayFast form HTML into the opened tab
    newWindow.document.open();
    newWindow.document.write(html);
    newWindow.document.close();
  } catch (err) {
    if (newWindow) {
      const qs = new URLSearchParams({ 
        amount: amount.replace(/[^0-9.]/g, ''), 
        item_name 
      }).toString();
      newWindow.location = `/test-payfast.html?${qs}`;
    }
    console.error('PayFast checkout error', err);
  }
};
