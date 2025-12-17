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
- The frontend PRE-ORDER button opens `/api/payfast/checkout?amount=199&item_name=300%20Million%20Connections` in a new tab.
- The serverless function builds the PayFast form, signs it using your merchant key/passphrase, and returns HTML that auto-submits the form to PayFast.
- PayFast will redirect back to `/?payment=success` or `/?payment=cancel` depending on outcome.
- PayFast also posts IPN notifications to `/api/payfast/notify` (you should implement verification and order updates there).

Local testing:
- Run the dev API locally for a complete experience:
  ```bash
  npm run dev:api   # starts the dev API on port 3001
  npm run dev       # starts Vite frontend on port 3000
  ```
- To test an **end-to-end** PayFast sandbox flow you must expose your local site to the public Internet (PayFast will **not** accept `localhost` return/cancel URLs). Use `ngrok` or similar to expose a public https URL:
  ```bash
  ngrok http 3000
  # Use the https://<random>.ngrok.io URL as your base for return/cancel/notify (set PUBLIC_URL)
  ```
- When running with a public tunnel, set the following env vars locally (or in your deployment):
  ```env
  PAYFAST_MERCHANT_ID=your_sandbox_merchant_id
  PAYFAST_MERCHANT_KEY=your_sandbox_merchant_key
  PAYFAST_PASSPHRASE=optional_passphrase
  PAYFAST_MODE=sandbox
  PUBLIC_URL=https://<your-ngrok-or-host>
  PAYFAST_VALIDATE_IPN=1    # optional: enable re-post validation to PayFast
  ```

Notes & security:
- Keep `PAYFAST_MERCHANT_KEY` and `PAYFAST_PASSPHRASE` private; do NOT commit them to the repo.
- In production, verify IPN messages fully (signature + re-post validation) and mark orders paid only after successful verification.

What's implemented in this repo now:
- `dev-api/server.js` supports `/api/payfast/checkout` and `/api/payfast/notify` for local testing. It creates local order records and can be used with `PUBLIC_URL` when exposed via ngrok.
- `api/payfast/checkout.js` persists a local order record where possible and returns an auto-submitting PayFast form.
- `api/payfast/notify.js` now verifies the MD5 signature (uses `PAYFAST_PASSPHRASE` if present), optionally re-posts the payload to PayFast for validation if `PAYFAST_VALIDATE_IPN=1`, and updates local order records in `data/orders.json`.

If you'd like, I can:
- Run ngrok from here (requires you to supply sandbox credentials or allow me to request an ephemeral tunnel) and perform a sandbox checkout to verify the full flow.
- Add a small orders dashboard (static page that reads `data/orders.json`) so you can see pending/paid orders in the browser.

Tell me which of those you'd like next (I can start with ngrok + E2E test or add the dashboard).

---

## Deployment checklist (Netlify)

Follow these final steps to make PayFast work on the live site:

1. Add the following environment variables to your Netlify site (Site settings → Build & deploy → Environment):
   - `PAYFAST_MERCHANT_ID` = your live PayFast merchant id
   - `PAYFAST_MERCHANT_KEY` = your live merchant key
   - `PAYFAST_PASSPHRASE` = (optional) your passphrase, if configured
   - `PAYFAST_MODE` = `live` (for production) or `sandbox` (for sandbox)
   - `PAYFAST_VALIDATE_IPN` = `1` (recommended)
   - `PUBLIC_URL` = `https://<your-site-domain>` (example: `https://300millionconnections.store`)
2. Ensure the site domain (`https://300millionconnections.store`) is set in Netlify and DNS is configured.
3. In your PayFast merchant dashboard (sandbox or live accordingly), configure any required return/cancel/notify URLs to point to your production URLs:
   - Return URL: `https://<your-site-domain>/payment-success`
   - Cancel URL: `https://<your-site-domain>/payment-cancel`
   - Notify URL: `https://<your-site-domain>/api/payfast/notify`

4. Deploy to Netlify (push to `main` will trigger the deploy if you have CI set up). Monitor deploy logs for function build steps and ensure functions are published (look for `Functions` artifacts in deploy log).

5. Test the live checkout once the deploy completes. If PayFast returns validation errors, check the exact error message and confirm with PayFast support that the merchant ID/key are active for that environment. If needed I can run the same programmatic probe against the live PayFast endpoint and provide logs.

6. After finishing tests, rotate any merchant keys that may have been exposed during testing for security.

---

If you want, I will:
- push the current branch to `main` (already done) and trigger a Netlify deploy (if you give me access or have CI set up); and
- once deployed, I'll run a live checkout probe and capture logs and responses so we can confirm the gateway is accepting your live credentials.

I will proceed with those actions now on the code side (push/commit already done). To finish the live setup, I still need you to add the **production** PayFast credentials to Netlify (I cannot add secrets on your behalf without Netlify access). After you add them, tell me and I will run the live verification and fix any remaining issues.