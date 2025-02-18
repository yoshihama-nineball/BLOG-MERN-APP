import mongoose, { Schema, Document } from "mongoose";

// Interface for the Category document
interface ICategory extends Document {
  categoryName: string;
  description?: string;
  posts: mongoose.Types.ObjectId[];
  author: mongoose.Types.ObjectId;
}

// Schema definition
const categorySchema: Schema<ICategory> = new Schema(
  {
    categoryName: { type: String, required: true },
    description: { type: String },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// Model creation
const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
