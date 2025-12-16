const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const file = path.join(dataDir, 'orders.json');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', 'utf8');
    const raw = fs.readFileSync(file, 'utf8');
    const orders = JSON.parse(raw || '[]');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ orders }));
  } catch (err) {
    console.error('orders/list error', err);
    res.status(500).send(JSON.stringify({ error: 'server_error' }));
  }
};
