const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const mongoose = require("mongoose");
const { User } = require("./src/models");

async function fixUniqueIndex() {
  try {
    console.log("🔧 FIXING UNIQUE EMAIL INDEX\n");
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Step 1: Drop the corrupted index
    console.log("Step 1: Dropping old email index...");
    try {
      await User.collection.dropIndex("email_1");
      console.log("✅ Old index dropped\n");
    } catch (err) {
      if (err.message.includes("index not found")) {
        console.log("ℹ️  No existing email index to drop\n");
      } else {
        throw err;
      }
    }

    // Step 2: Rebuild with unique constraint
    console.log("Step 2: Creating new unique email index...");
    await User.collection.createIndex(
      { email: 1 }, 
      { unique: true, sparse: true }
    );
    console.log("✅ Unique index created\n");

    // Step 3: Verify the index
    console.log("Step 3: Verifying index...");
    const indexes = await User.collection.getIndexes();
    const emailIndex = indexes.email_1;
    
    if (emailIndex && emailIndex.unique === true) {
      console.log("✅ Email index is now UNIQUE\n");
      console.log("✅ FIX SUCCESSFUL!");
    } else {
      console.log("❌ Index creation failed");
    }

  } catch (err) {
    console.error("❌ ERROR:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

fixUniqueIndex();
