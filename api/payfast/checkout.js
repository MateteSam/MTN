// Serverless PayFast handlers were intentionally removed in favor of a client-side shortlink embed.
// The site now directs buyers to https://payf.st/jrpi0 for the Print First Edition purchase.
// Keeping a small stub to avoid 404s if any code calls this function inadvertently.
module.exports = async (req, res) => {
  res.status(410).send('PayFast server-side checkout disabled. Use the client-side PayFast shortlink.');
};
