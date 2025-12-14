Quick PayFast setup

Files added:
- api/payfast/checkout.js  - serverless endpoint that builds a PayFast auto-submitting form and redirects the buyer to PayFast.
- api/payfast/notify.js    - basic IPN notify stub (logs incoming POSTs).

Required environment variables (set in Vercel/Netlify or your deployment):

- PAYFAST_MERCHANT_ID
- PAYFAST_MERCHANT_KEY
- (optional) PAYFAST_PASSPHRASE
- PAYFAST_MODE = 'sandbox' or 'live' (default: 'sandbox')

How it works:
- The frontend PREORDER button opens `/api/payfast/checkout?amount=199&item_name=300%20Million%20Connections` in a new tab.
- The serverless function builds the PayFast form, signs it using your merchant key/passphrase, and returns HTML that auto-submits the form to PayFast.
- PayFast will redirect back to `/?payment=success` or `/?payment=cancel` depending on outcome.
- PayFast also posts IPN notifications to `/api/payfast/notify` (you should implement verification and order updates there).

Local testing:
- For local testing with Vite only, you'll need to run a server to serve the `/api/...` endpoints (Vercel functions don't run locally by default).
- Easiest deployment: Deploy this project to Vercel (it will pick up `api/` as serverless functions). Set the required env vars in your Vercel project settings and set `PAYFAST_MODE` to `sandbox` while testing.

Notes & security:
- Keep `PAYFAST_MERCHANT_KEY` and `PAYFAST_PASSPHRASE` private; do NOT commit them to the repo.
- In production, implement full IPN signature verification and mark orders paid only after verification.

If you'd like, I can:
- Add a serverless `notify` verifier implementation (requires reading PayFast docs and verifying signatures).
- Add a small dashboard page to view pending preorders saved in a simple JSON file or lightweight DB.

Tell me how you'd like to proceed (deploy to Vercel now, or implement local dev server).