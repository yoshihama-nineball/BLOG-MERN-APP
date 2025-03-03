import mongoose, { Document } from 'mongoose';
interface IPlan extends Document {
    planName: string;
    features: string[];
    limitations: string[];
    price: number;
}
declare const Plan: mongoose.Model<IPlan, {}, {}, {}, mongoose.Document<unknown, {}, IPlan> & IPlan & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Plan;
