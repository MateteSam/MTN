import crypto from 'crypto';
import https from 'https';
import querystring from 'querystring';
import { URL } from 'url';
import * as orders from '../../lib/orders.js';

// Basic notify endpoint stub for PayFast IPN (instant payment notifications).
// PayFast will POST to this URL to notify payment status. In production,
// verify the signature and payment data according to PayFast docs.

export default async function handler(req, res) {
  try {
    const payload = req.body || {};
    console.log('PayFast notify received', { headers: req.headers, body: payload });

    // Basic signature verification using passphrase if provided
    const passphrase = process.env.PAYFAST_PASSPHRASE || '';
    const signature = payload.signature || '';

    // Build verification string
    const keys = Object.keys(payload).filter(k => k !== 'signature' && payload[k] !== undefined && payload[k] !== null && payload[k] !== '').sort();
    const pieces = keys.map(k => `${k}=${encodeURIComponent(String(payload[k]).trim()).replace(/%20/g, '+')}`);
    let signedString = pieces.join('&');
    if (passphrase) signedString += `&passphrase=${encodeURIComponent(passphrase)}`;

    const crypto = require('crypto');
    const md5 = crypto.createHash('md5').update(signedString).digest('hex');

    if (!signature || signature !== md5) {
      console.warn('PayFast notify: invalid signature', { expected: md5, received: signature });
      // still return 200 to avoid PayFast retries, but log
      res.status(200).send('INVALID_SIGNATURE');
      return;
    }

    // Optional additional validation by POSTing back to PayFast (safer)
    if (process.env.PAYFAST_VALIDATE_IPN === '1') {
      const https = require('https');
      const querystring = require('querystring');
      const mode = (process.env.PAYFAST_MODE || 'sandbox').toLowerCase();
      const validateUrl = mode === 'live' ? 'https://www.payfast.co.za/eng/query/validate' : 'https://sandbox.payfast.co.za/eng/query/validate';
      const postData = querystring.stringify(payload);

      await new Promise((resolve, reject) => {
        const u = new URL(validateUrl);
        const opts = { hostname: u.hostname, path: u.pathname, method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) } };
        const reqp = https.request(opts, (resp) => {
          let text = '';
          resp.on('data', (d) => text += d);
          resp.on('end', () => {
            if (text && text.trim() === 'VALID') return resolve();
            console.warn('PayFast notify: validate returned not VALID', text);
            return reject(new Error('IPN validation failed'));
          });
        });
        reqp.on('error', reject);
        reqp.write(postData);
        reqp.end();
      });
    }

    // Cross-check order record and mark as paid
    const m_payment_id = payload.m_payment_id;
    const order = m_payment_id ? await orders.getOrder(m_payment_id) : null;

    if (order) {
      await orders.updateOrderStatus(m_payment_id, 'paid', { raw_notify: payload });
      console.log('Order marked paid:', m_payment_id);
    } else {
      console.warn('Notify received for unknown order', m_payment_id);
      // Create a record for tracking
      if (m_payment_id) await orders.createOrder({ m_payment_id, amount: payload.amount || '0.00', item_name: payload.item_name || '', status: 'paid', meta: { raw_notify: payload } });
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
};
