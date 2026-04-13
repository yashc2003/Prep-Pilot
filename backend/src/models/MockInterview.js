const mongoose = require("mongoose");

const { Schema } = mongoose;

const mockInterviewSchema = new Schema(
  {
    candidate_id: { type: Schema.Types.ObjectId, ref: "Candidate", required: true, index: true },
    date: { type: Date, required: true },
    domain: { type: String, required: true, enum: ["HR", "Technical"] },
    score: { type: Number, default: 0, min: 0, max: 100 },
    feedback: { type: String, default: "" },
    confidence_score: { type: Number, default: 0, min: 0, max: 100 },
    communication_score: { type: Number, default: 0, min: 0, max: 100 }
  },
  { timestamps: false }
);

const MockInterview = mongoose.model("MockInterview", mockInterviewSchema, "mock_interviews");

module.exports = { MockInterview };

