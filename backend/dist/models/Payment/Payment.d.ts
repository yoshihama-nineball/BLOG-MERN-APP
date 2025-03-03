import mongoose, { Document } from 'mongoose';
interface IPayment extends Document {
    user: mongoose.Types.ObjectId;
    reference: string;
    currency: string;
    status: string;
    subscriptionPlan: mongoose.Types.ObjectId;
    amount: number;
}
declare const Payment: mongoose.Model<IPayment, {}, {}, {}, mongoose.Document<unknown, {}, IPayment> & IPayment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Payment;
