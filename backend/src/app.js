const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // must be BEFORE routes

// ✅ Routes
app.use("/api/admin/auth", require("./routes/adminAuth.routes"));
app.use("/api/auth", require("./routes/userAuth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/categories", require("./routes/category.routes"));
// ✅ Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

module.exports = app;
