const admin = require("../config/firebase");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.phoneLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "Firebase token required" });
    }

    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const phoneNumber = decoded.phone_number;

    if (!phoneNumber) {
      return res.status(401).json({ message: "Invalid Firebase token" });
    }

    // Find or create user
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = await User.create({ phoneNumber, role: "USER" });
    }

    // Create backend JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      phoneNumber,
    });
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
