const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "company", "consultancy", "college", "candidate"],
      index: true
    },
    phone: { type: String, required: true, trim: true },
    status: { type: String, default: "active", enum: ["active", "inactive", "blocked"] }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = { User };

