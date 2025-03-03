import mongoose, { Schema, Document } from 'mongoose'

interface IPlan extends Document {
  planName: string
  features: string[]
  limitations: string[]
  price: number
}

const planSchema: Schema<IPlan> = new Schema(
  {
    planName: { type: String, required: true },
    features: [String],
    limitations: [String],
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

const Plan = mongoose.model<IPlan>('Plan', planSchema)

export default Plan
