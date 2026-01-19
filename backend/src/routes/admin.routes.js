const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

// ✅ Test protected admin route
router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin",
    adminId: req.user.id,
  });
});

module.exports = router;
