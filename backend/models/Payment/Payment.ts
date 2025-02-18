import mongoose, { Schema, Document } from "mongoose";

interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  reference: string;
  currency: string;
  status: string;
  subscriptionPlan: mongoose.Types.ObjectId;
  amount: number;
}

const paymentSchema: Schema<IPayment> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;
