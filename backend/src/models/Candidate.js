const mongoose = require("mongoose");

const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    education: { type: String, default: "", trim: true },
    skills: { type: [String], default: [] },
    resume_url: { type: String, default: "", trim: true },
    experience: { type: String, default: "", trim: true },
    college_id: { type: Schema.Types.ObjectId, ref: "College", default: null, index: true }
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

const Candidate = mongoose.model("Candidate", candidateSchema, "candidates");

module.exports = { Candidate };

