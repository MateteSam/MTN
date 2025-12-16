const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // ignore
  }
}

async function readOrders() {
  await ensureDataDir();
  try {
    const txt = await fs.readFile(ORDERS_FILE, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (err) {
    return [];
  }
}

async function writeOrders(orders) {
  await ensureDataDir();
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

async function createOrder({ m_payment_id, amount, item_name, status = 'pending', meta = {} }) {
  const orders = await readOrders();
  const existing = orders.find(o => o.m_payment_id === m_payment_id);
  if (existing) return existing;
  const order = { m_payment_id, amount, item_name, status, created_at: new Date().toISOString(), meta };
  orders.push(order);
  await writeOrders(orders);
  return order;
}

async function updateOrderStatus(m_payment_id, status, update = {}) {
  const orders = await readOrders();
  const idx = orders.findIndex(o => o.m_payment_id === m_payment_id);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], status, updated_at: new Date().toISOString(), ...update };
  await writeOrders(orders);
  return orders[idx];
}

async function getOrder(m_payment_id) {
  const orders = await readOrders();
  return orders.find(o => o.m_payment_id === m_payment_id) || null;
}

module.exports = { createOrder, updateOrderStatus, getOrder, readOrders };
