import mongoose, { Schema, Document } from "mongoose";

// Interface for the Comment document
interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

// Schema definition
const commentSchema: Schema<IComment> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

// Model creation
const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
