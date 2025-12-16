const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import the serverless-style handler from api/payfast/checkout.js
const checkoutHandler = require(path.join(__dirname, '..', 'api', 'payfast', 'checkout'));

app.post('/api/payfast/checkout', (req, res) => {
  return checkoutHandler(req, res);
});

app.get('/api/payfast/checkout', (req, res) => {
  return checkoutHandler(req, res);
});

// Simple notify endpoint stub for local testing
app.post('/api/payfast/notify', (req, res) => {
  console.log('IPN notify received (dev):', req.body);
  res.status(200).send('OK');
});

const port = process.env.API_PORT || 3001;
app.listen(port, '127.0.0.1', () => {
  console.log(`Dev API listening on http://127.0.0.1:${port}`);
});
