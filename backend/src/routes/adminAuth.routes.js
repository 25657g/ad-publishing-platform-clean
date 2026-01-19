const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/adminAuth.controller");

// ✅ LOGIN ROUTE (no middleware)
router.post("/login", adminLogin);

module.exports = router;

