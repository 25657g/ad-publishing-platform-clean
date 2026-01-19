const AdType = require("../models/AdType");

/**
 * ADMIN: Create Ad Type
 */
exports.createAdType = async (req, res) => {
  try {
    const { name, price, durationDays } = req.body;

    const exists = await AdType.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Ad type already exists" });
    }

    const adType = await AdType.create({
      name,
      price,
      durationDays,
    });

    res.status(201).json({
      success: true,
      message: "Ad type created",
      adType,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ADMIN: Update Ad Type
 */
exports.updateAdType = async (req, res) => {
  try {
    const adType = await AdType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Ad type updated",
      adType,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ADMIN: Delete Ad Type
 */
exports.deleteAdType = async (req, res) => {
  try {
    await AdType.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Ad type deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * PUBLIC: Get active Ad Types
 */
exports.getAdTypes = async (req, res) => {
  try {
    const adTypes = await AdType.find({ isActive: true }).sort({ price: 1 });
    res.json({ success: true, adTypes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
