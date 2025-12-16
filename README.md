<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/12pFt3inh1lt4MvyCe6Nw3Xq5NiJd9br6

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
 
## PayFast integration

1. Copy `.env.example` to `.env` and fill `PAYFAST_MERCHANT_ID` and `PAYFAST_MERCHANT_KEY`. Do NOT commit `.env`.

2. By default the server runs in `sandbox` mode. To switch to production, set `PAYFAST_MODE=live` in your `.env`.

3. The checkout endpoint is at `/api/payfast/checkout`. The frontend posts JSON `{ amount, item_name }` to that endpoint and opens the returned PayFast form in a new tab.

4. Implement IPN verification in `api/payfast/notify.js` for production: re-post the received payload to PayFast's verification endpoint and confirm the response and signature before marking orders as paid.

Security: never hardcode Merchant ID/Key in source. Use environment variables as shown in `.env.example`.
