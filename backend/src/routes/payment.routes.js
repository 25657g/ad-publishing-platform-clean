const express = require("express");
const router = express.Router();

const { createPaymentIntent } = require("../controllers/payment.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/create-intent", verifyToken, createPaymentIntent);

module.exports = router;
