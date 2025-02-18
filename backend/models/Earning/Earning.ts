import mongoose, { Schema, Document } from "mongoose";

interface IEarning extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  amount: number;
  calculatedOn: Date;
}

const earningSchema: Schema<IEarning> = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    amount: {
      type: Number,
      required: true,
    },
    calculatedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Earning = mongoose.model<IEarning>("Earning", earningSchema);

export default Earning;
