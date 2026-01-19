const stripe = require("../config/stripe");
const Ad = require("../models/Ad");
const AdType = require("../models/AdType");

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const ad = await Ad.findOne({ paymentRef: paymentIntent.id });
    if (ad) {
      const adType = await AdType.findById(ad.adType);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + adType.durationDays);

      ad.paymentStatus = "paid";
      ad.isActive = true;
      ad.expiresAt = expiresAt;

      await ad.save();
    }
  }

  res.json({ received: true });
};
