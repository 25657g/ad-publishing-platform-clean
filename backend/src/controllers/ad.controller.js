const Ad = require("../models/Ad");
const AdType = require("../models/AdType");

/**
 * Create Ad with images
 */
exports.createAd = async (req, res) => {
  try {
    const { title, description, category, adType } = req.body;

    const selectedAdType = await AdType.findById(adType);
    if (!selectedAdType || !selectedAdType.isActive) {
      return res.status(400).json({ message: "Invalid Ad Type" });
    }

    const images = req.files?.map((file) => file.path) || [];

    let expiresAt = null;

    if (selectedAdType.price === 0) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + selectedAdType.durationDays);
    }

    const ad = await Ad.create({
      title,
      description,
      category,
      adType,
      images,
      user: req.user.id,
      paymentStatus: selectedAdType.price === 0 ? "paid" : "pending",
      isActive: selectedAdType.price === 0,
      expiresAt,
    });

    res.status(201).json({
      message:
        selectedAdType.price === 0
          ? "Ad published successfully"
          : "Payment required",
      ad,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/**
 * Get My Ads
 */
exports.getMyAds = async (req, res) => {
  try {
    const ads = await Ad.find({ user: req.user.id })
      .populate("category", "name")
      .populate("adType", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, ads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get Published Ads (Public)
 */
exports.getPublicAds = async (req, res) => {
  try {
    const ads = await Ad.aggregate([
      // 1️⃣ Only active, paid, non-expired ads
      {
        $match: {
          isActive: true,
          paymentStatus: "paid",
          expiresAt: { $gt: new Date() },
        },
      },

      // 2️⃣ Join AdType to get price
      {
        $lookup: {
          from: "adtypes",
          localField: "adType",
          foreignField: "_id",
          as: "adType",
        },
      },
      { $unwind: "$adType" },

      // 3️⃣ Join Category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },

      // 4️⃣ Join User (optional public fields only)
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // 5️⃣ SORT LOGIC ⭐⭐⭐
      {
        $sort: { createdAt: -1, "adType.priority": -1 },
      },
    ]);

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Deactivate Ad
 */
exports.deactivateAd = async (req, res) => {
  try {
    const ad = await Ad.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isActive: false },
      { new: true }
    );

    if (!ad) {
      return res
        .status(404)
        .json({ success: false, message: "Ad not found" });
    }

    res.json({ success: true, message: "Ad deactivated", ad });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
