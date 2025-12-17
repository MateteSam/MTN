(async () => {
  try {
    const orders = require('../lib/orders');
    const o = await orders.getOrder('preorder_1765973073959');
    console.log('Order:', o);
    const all = await orders.readOrders();
    console.log('All orders count', all.length);
  } catch (err) {
    console.error('Error reading orders', err);
  }
})();
