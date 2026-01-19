const User = require("../models/User");

exports.firebaseLogin = async (req, res) => {
  const { phone_number } = req.firebaseUser;

  if (!phone_number) {
    return res.status(400).json({ message: "Phone number not found" });
  }

  let user = await User.findOne({ phoneNumber: phone_number });

  if (!user) {
    user = await User.create({ phoneNumber: phone_number });
  }

  res.json({
    message: "Login successful",
    user,
  });
};
