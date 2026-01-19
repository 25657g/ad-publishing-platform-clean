const express = require("express");
const router = express.Router();
const { phoneLogin } = require("../controllers/userAuth.controller");

router.post("/login", phoneLogin);

module.exports = router;
