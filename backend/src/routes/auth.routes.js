const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/auth.middleware");
const { firebaseLogin } = require("../controllers/auth.controller");

router.post("/firebase-login", verifyFirebaseToken, firebaseLogin);

module.exports = router;
