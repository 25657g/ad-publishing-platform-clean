const stripe = require("../config/stripe");
const Ad = require("../models/Ad");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { adId } = req.body;

    const ad = await Ad.findById(adId).populate("adType");
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    if (ad.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (ad.adType.price === 0) {
      return res.status(400).json({ message: "This ad does not require payment" });
    }

    if (ad.paymentStatus === "paid") {
      return res.status(400).json({ message: "Ad already paid" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: ad.adType.price * 100, // 🔒 NOT EDITABLE
      currency: "usd",
      metadata: {
        adId: ad._id.toString(),
      },
    });

    ad.paymentRef = paymentIntent.id;
    await ad.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
