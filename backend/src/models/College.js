const mongoose = require("mongoose");

const { Schema } = mongoose;

const collegeSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    college_name: { type: String, required: true, trim: true },
    location: { type: String, default: "", trim: true },
    contact_email: { type: String, default: "", lowercase: true, trim: true }
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

const College = mongoose.model("College", collegeSchema, "colleges");

module.exports = { College };

