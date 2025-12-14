// Basic notify endpoint stub for PayFast IPN (instant payment notifications).
// PayFast will POST to this URL to notify payment status. In production,
// verify the signature and payment data according to PayFast docs.

module.exports = async (req, res) => {
  try {
    console.log('PayFast notify received', { headers: req.headers, body: req.body });
    // TODO: verify the signature and update order records.
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
};
