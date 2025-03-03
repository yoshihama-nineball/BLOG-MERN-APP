import mongoose, { Document } from 'mongoose';
interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    message: string;
    isRead: boolean;
}
declare const Notification: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, mongoose.Schema<INotification, mongoose.Model<INotification, any, any, any, mongoose.Document<unknown, any, INotification> & INotification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, INotification, mongoose.Document<unknown, {}, mongoose.FlatRecord<INotification>> & mongoose.FlatRecord<INotification> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>>;
export default Notification;
