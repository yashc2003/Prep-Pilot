const mongoose = require("mongoose");

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    job_id: { type: Schema.Types.ObjectId, ref: "Job", required: true, index: true },
    candidate_id: { type: Schema.Types.ObjectId, ref: "Candidate", required: true, index: true },
    status: { type: String, default: "applied", enum: ["applied", "shortlisted", "rejected", "selected"] },
    applied_date: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

applicationSchema.index({ job_id: 1, candidate_id: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema, "applications");

module.exports = { Application };

