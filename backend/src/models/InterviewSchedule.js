const mongoose = require("mongoose");

const { Schema } = mongoose;

const interviewScheduleSchema = new Schema(
  {
    candidate_id: { type: Schema.Types.ObjectId, ref: "Candidate", required: true, index: true },
    company_id: { type: Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    date: { type: Date, required: true },
    mode: { type: String, required: true, enum: ["online", "offline"] },
    status: { type: String, default: "scheduled", enum: ["scheduled", "completed", "cancelled"] }
  },
  { timestamps: false }
);

const InterviewSchedule = mongoose.model("InterviewSchedule", interviewScheduleSchema, "interviews");

module.exports = { InterviewSchedule };

