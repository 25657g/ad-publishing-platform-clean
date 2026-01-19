const mongoose = require("mongoose");

const adTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    durationDays: {
      type: Number, // how long the ad is active
      default: 30,
    },
priority: {
  type: Number, // 1 = Free, 2 = Premium, 3 = Featured
},
    isActive: {
      type: Boolean,
      default: true,
    },

    // Stripe-ready (use later)
    stripePriceId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdType", adTypeSchema);
