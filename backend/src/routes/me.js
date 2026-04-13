const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { User, Candidate, College, Company, Consultancy } = require("../models");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.sub).select("-passwordHash -__v");
  if (!user) return res.status(404).json({ error: "User not found" });

  let profile = null;
  if (user.role === "candidate") profile = await Candidate.findOne({ user_id: user._id });
  if (user.role === "college") profile = await College.findOne({ user_id: user._id });
  if (user.role === "company") profile = await Company.findOne({ user_id: user._id });
  if (user.role === "consultancy") profile = await Consultancy.findOne({ user_id: user._id });

  return res.json({ user, profile });
});

module.exports = router;
