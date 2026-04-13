const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const mongoose = require("mongoose");
const { User, Candidate, Company, College, Consultancy, Application } = require("./src/models");

async function run() {
  try {
    console.log("BACKEND DATABASE DIAGNOSTIC TEST\n");

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Missing MONGODB_URI in backend/.env");

    console.log("1) Testing MongoDB connection...");
    await mongoose.connect(uri);
    console.log("   OK\n");

    console.log("2) Checking collections...");
    const [userCount, candidateCount, companyCount, collegeCount, consultancyCount] = await Promise.all([
      User.countDocuments(),
      Candidate.countDocuments(),
      Company.countDocuments(),
      College.countDocuments(),
      Consultancy.countDocuments()
    ]);

    console.log(`   users: ${userCount}`);
    console.log(`   candidates: ${candidateCount}`);
    console.log(`   companies: ${companyCount}`);
    console.log(`   colleges: ${collegeCount}`);
    console.log(`   consultancies: ${consultancyCount}\n`);

    console.log("3) Checking unique indexes...");
    const userIndexes = await User.collection.indexes();
    const emailIndex = userIndexes.find((idx) => idx.name === "email_1");
    console.log(`   users.email unique: ${emailIndex?.unique === true ? "OK" : "MISSING"}`);

    const appIndexes = await Application.collection.indexes().catch(() => []);
    const appUnique = appIndexes.find((idx) => idx.name === "job_id_1_candidate_id_1");
    console.log(`   applications(job_id,candidate_id) unique: ${appUnique?.unique === true ? "OK" : "MISSING"}`);
    console.log("");

    console.log("4) Quick sanity query (latest users):");
    const users = await User.find({}, "email role created_at").sort({ created_at: -1 }).limit(5).lean();
    users.forEach((u) => console.log(`   - ${u.email} (${u.role})`));
    if (users.length === 0) console.log("   (no users yet)");

    console.log("\nSUMMARY: Database connection and models are working.");
  } finally {
    await mongoose.connection.close().catch(() => {});
  }
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("ERROR:", err.message);
  process.exit(1);
});

