const mongoose = require("mongoose");

const { Schema } = mongoose;

const aiEvaluationSchema = new Schema(
  {
    interview_id: { type: Schema.Types.ObjectId, ref: "MockInterview", required: true, index: true },
    answer_text: { type: String, required: true },
    score: { type: Number, default: 0, min: 0, max: 100 },
    remarks: { type: String, default: "" }
  },
  { timestamps: false }
);

const AIEvaluation = mongoose.model("AIEvaluation", aiEvaluationSchema, "ai_evaluations");

module.exports = { AIEvaluation };

