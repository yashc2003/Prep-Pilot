const mongoose = require("mongoose");

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    candidate_id: { type: Schema.Types.ObjectId, ref: "Candidate", required: true, index: true },
    consultancy_id: { type: Schema.Types.ObjectId, ref: "Consultancy", required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, default: "pending", enum: ["pending", "paid", "failed", "refunded"] },
    date: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

const Payment = mongoose.model("Payment", paymentSchema, "payments");

module.exports = { Payment };

