// PayFast notify handler removed per client request in favor of client-side embed.
// This function now returns 410 Gone.
export default async function handler(req, res) {
  res.status(410).send('PayFast notify handler disabled.');
};
