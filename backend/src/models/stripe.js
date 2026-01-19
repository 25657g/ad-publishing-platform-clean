const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    adType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdType",
      required: true,
    },

    images: [{ type: String }],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentRef: {
      type: String, // Stripe PaymentIntent ID
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);
