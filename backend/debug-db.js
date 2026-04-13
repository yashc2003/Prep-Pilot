const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const mongoose = require("mongoose");
const { User } = require("./src/models");

async function debug() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✓ Connected to MongoDB\n");

    // Show all users
    const users = await User.find({}, "email role _id created_at");
    console.log(`📋 Total users: ${users.length}`);
    if (users.length > 0) {
      console.table(users);
    }

    // Check for duplicate emails
    const duplicates = await User.aggregate([
      { $group: { _id: "$email", count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } }
    ]);

    if (duplicates.length > 0) {
      console.log("\n⚠️  DUPLICATE EMAILS FOUND:");
      console.table(duplicates);
      console.log("\nTo fix: db.users.deleteOne({ _id: \"<objectId>\" })");
    } else {
      console.log("\n✓ No duplicate emails");
    }

    // Show indexes
    const indexes = await User.collection.getIndexes();
    console.log("\n📇 Email Index Status:");
    console.log(indexes.email_1 ? "✓ Unique index exists" : "✗ No unique index");

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

debug();
