const mongoose = require("mongoose");

const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    company_id: { type: Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    job_title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    skills_required: { type: [String], default: [] },
    salary: { type: String, default: "" },
    location: { type: String, required: true, trim: true },
    experience: { type: String, default: "", trim: true },
    deadline: { type: Date, required: true },
    status: { type: String, default: "open", enum: ["open", "closed", "paused"] }
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

const Job = mongoose.model("Job", jobSchema, "jobs");

module.exports = { Job };

