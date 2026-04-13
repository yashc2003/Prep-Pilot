const mongoose = require("mongoose");

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    company_name: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    website: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true }
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

const Company = mongoose.model("Company", companySchema, "companies");

module.exports = { Company };

