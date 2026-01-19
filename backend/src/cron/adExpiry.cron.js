const cron = require("node-cron");
const Ad = require("../models/Ad");

cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();

    const result = await Ad.updateMany(
      {
        isActive: true,
        expiresAt: { $lte: now },
      },
      {
        $set: { isActive: false },
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`Expired ads deactivated: ${result.modifiedCount}`);
    }
  } catch (err) {
    console.error("Ad expiry cron failed:", err.message);
  }
});
