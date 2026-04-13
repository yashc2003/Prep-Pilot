const mongoose = require("mongoose");

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    message: { type: String, required: true },
    status: { type: String, default: "unread", enum: ["read", "unread"] },
    created_at: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

const Notification = mongoose.model("Notification", notificationSchema, "notifications");

module.exports = { Notification };

