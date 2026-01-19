require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    username: "admin",
    password: hashedPassword,
    role: "ADMIN",
  });

  console.log("Admin user created");
  process.exit();
})();
