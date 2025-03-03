import mongoose, { Document } from 'mongoose';
interface IUser extends Document {
    username: string;
    profilePicture: object | null;
    email: string | null;
    password: string | null;
    googleId: string | null;
    authMethod: 'google' | 'local' | 'facebook' | 'github';
    passwordResetToken: string | null;
    accountVerificationToken: string | null;
    accountVerificationExpires: Date | null;
    passwordResetExpires: Date | null;
    posts: mongoose.Types.ObjectId[];
    totalEarnings: number;
    nextEarningDate: Date;
    Plan: mongoose.Types.ObjectId | null;
    isEmailVerified: boolean;
    payments: mongoose.Types.ObjectId[];
    hasSelectedPlan: boolean;
    lastLogin: Date;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
