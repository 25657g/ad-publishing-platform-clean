const express = require("express");
const router = express.Router();

const {
  createAd,
  getMyAds,
  getPublicAds,
  deactivateAd,
} = require("../controllers/ad.controller");

const { verifyToken } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");

// USER: create ad with images (multiple)
router.post("/", verifyToken, upload.array("images", 5), createAd);
router.get("/my", verifyToken, getMyAds);
router.put("/deactivate/:id", verifyToken, deactivateAd);

// PUBLIC: get published ads
router.get("/", getPublicAds);

module.exports = router;
