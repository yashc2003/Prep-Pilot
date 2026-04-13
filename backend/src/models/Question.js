const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    domain: { type: String, required: true, enum: ["HR", "Technical"] },
    question_text: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ["Easy", "Medium", "Hard"] }
  },
  { timestamps: false }
);

const Question = mongoose.model("Question", questionSchema, "questions");

module.exports = { Question };

