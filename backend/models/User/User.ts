import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  username: string
  profilePicture: object | null
  email: string | null
  password: string | null
  googleId: string | null
  authMethod: 'google' | 'local' | 'facebook' | 'github'
  passwordResetToken: string | null
  accountVerificationToken: string | null
  accountVerificationExpires: Date | null
  passwordResetExpires: Date | null
  posts: mongoose.Types.ObjectId[]
  totalEarnings: number
  nextEarningDate: Date
  Plan: mongoose.Types.ObjectId | null
  isEmailVerified: boolean
  payments: mongoose.Types.ObjectId[]
  hasSelectedPlan: boolean
  lastLogin: Date
  followers: mongoose.Types.ObjectId[]
  following: mongoose.Types.ObjectId[]
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: Object,
      default: null,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
    authMethod: {
      type: String,
      enum: ['google', 'local', 'facebook', 'github'],
      required: true,
      default: 'local',
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    accountVerificationToken: {
      type: String,
      default: null,
    },
    accountVerificationExpires: {
      type: Date,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    totalEarnings: { type: Number, default: 0 },
    nextEarningDate: {
      type: Date,
      default: () =>
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    },
    Plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
    hasSelectedPlan: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

const User = mongoose.model<IUser>('User', userSchema)

export default User
