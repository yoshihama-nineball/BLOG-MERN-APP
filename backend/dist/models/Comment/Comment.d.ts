import mongoose, { Document } from 'mongoose';
interface IComment extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
}
declare const Comment: mongoose.Model<IComment, {}, {}, {}, mongoose.Document<unknown, {}, IComment> & IComment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Comment;
