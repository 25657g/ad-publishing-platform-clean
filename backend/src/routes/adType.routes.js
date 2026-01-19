const express = require("express");
const router = express.Router();

const {
  createAdType,
  updateAdType,
  deleteAdType,
  getAdTypes,
} = require("../controllers/adType.controller");
const { isAdmin } = require("../middleware/admin.middleware");
const {
  verifyToken,
} = require("../middleware/auth.middleware");

// ADMIN
router.post("/", verifyToken, isAdmin, createAdType);
router.put("/:id", verifyToken, isAdmin, updateAdType);
router.delete("/:id", verifyToken, isAdmin, deleteAdType);

// PUBLIC
router.get("/", getAdTypes);

module.exports = router;
