const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, Candidate, College, Company, Consultancy } = require("../models");

const router = express.Router();

function safeUser(userDoc) {
  const obj = userDoc.toObject({ versionKey: false });
  delete obj.passwordHash;
  return obj;
}

function normalizeRole(role) {
  return String(role || "").trim().toLowerCase();
}

function firstNonEmpty(...values) {
  for (const value of values) {
    const s = typeof value === "string" ? value.trim() : value;
    if (s) return s;
  }
  return "";
}

router.post("/register", async (req, res, next) => {
  let createdUserId = null;
  try {
    const body = req.body || {};
    const role = normalizeRole(body.role);
    if (!["admin", "company", "consultancy", "college", "candidate"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const name = firstNonEmpty(body.name, body.fullName);
    const email = firstNonEmpty(body.email).toLowerCase();
    const phone = firstNonEmpty(body.phone, body.mobile);

    console.log("📝 DEBUG - Registration attempt:");
    console.log("  email:", email);
    console.log("  name:", name);
    console.log("  phone:", phone);

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!phone) return res.status(400).json({ error: "Phone is required" });

    // Check if email already exists
    console.log("  Checking for existing user with email:", email);
    const existingUser = await User.findOne({ email });
    console.log("  Found existing user:", !!existingUser);
    
    if (existingUser) {
      console.log("  ❌ User already exists:", existingUser.email);
      return res.status(409).json({ error: "Email already exists. Please use a different email or try logging in." });
    }

    const password = String(body.password || "");
    if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
    if (String(body.confirmPassword || "") !== password) return res.status(400).json({ error: "Passwords do not match" });

    const passwordHash = await bcrypt.hash(password, 10);

    let createProfile = async () => {};

    if (role === "company") {
      const company_name = firstNonEmpty(body.company_name, body.companyName);
      if (!company_name) return res.status(400).json({ error: "company_name is required for company role" });

      createProfile = async (user) => {
        await Company.create({
          user_id: user._id,
          company_name,
          industry: body.industry || body.industryType || "IT",
          location: body.location || body.city || "Unknown",
          website: body.website || body.companyWebsite || "",
          description: body.description || ""
        });
      };
    }

    if (role === "college") {
      const college_name = firstNonEmpty(body.college_name, body.collegeName);
      if (!college_name) return res.status(400).json({ error: "college_name is required for college role" });

      createProfile = async (user) => {
        await College.create({
          user_id: user._id,
          college_name,
          location: body.location || body.city || "",
          contact_email: body.contact_email || body.collegeEmail || body.email || ""
        });
      };
    }

    if (role === "consultancy") {
      const consultancyName = firstNonEmpty(body.consultancyName, body.name);
      if (!consultancyName) return res.status(400).json({ error: "name is required for consultancy role" });

      createProfile = async (user) => {
        await Consultancy.create({
          user_id: user._id,
          name: consultancyName || user.name,
          services: body.services || body.servicesOffered || [],
          fees: Number(body.fees || 0),
          rating: Number(body.rating || 0)
        });
      };
    }

    if (role === "candidate") {
      createProfile = async (user) => {
        await Candidate.create({
          user_id: user._id,
          education: body.education || body.qualification || "",
          skills: body.skills || [],
          resume_url: body.resume_url || body.resumeUrl || "",
          experience: body.experience || "",
          college_id: body.college_id || null
        });
      };
    }

    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      phone,
      status: body.status || "active"
    });
    createdUserId = user._id;

    await createProfile(user);

    res.status(201).json({ user: safeUser(user) });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    if (createdUserId) {
      try {
        await User.deleteOne({ _id: createdUserId });
      } catch (_) {
        // ignore rollback failures
      }
    }
    if (err && err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password, role } = req.body || {};
    if (!role) return res.status(400).json({ error: "Role is required" });
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email: String(email || "").trim().toLowerCase(), role: normalizeRole(role) });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(String(password || ""), user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: String(user._id), role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: safeUser(user) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
