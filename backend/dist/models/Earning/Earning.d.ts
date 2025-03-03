import mongoose, { Document } from 'mongoose';
interface IEarning extends Document {
    user: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    amount: number;
    calculatedOn: Date;
}
declare const Earning: mongoose.Model<IEarning, {}, {}, {}, mongoose.Document<unknown, {}, IEarning> & IEarning & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Earning;
