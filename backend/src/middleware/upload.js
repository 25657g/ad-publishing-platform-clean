const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ad-images",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 1200, height: 1200, crop: "limit" }],
  },
});

// Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB per file
});

module.exports = upload;
