const mongoose = require("mongoose");

const { Schema } = mongoose;

const consultancySchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    services: { type: [String], default: [] },
    fees: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 }
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

const Consultancy = mongoose.model("Consultancy", consultancySchema, "consultancies");

module.exports = { Consultancy };

