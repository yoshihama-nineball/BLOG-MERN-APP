

import mongoose, { Schema, Document } from "mongoose";

interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  message: string;
  isRead: boolean;
}

const notificationSchema: Schema<INotification> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;

