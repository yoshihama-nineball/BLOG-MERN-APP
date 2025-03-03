import mongoose, { Document } from 'mongoose';
interface IPost extends Document {
    title: string;
    description: string;
    image: object;
    author: mongoose.Types.ObjectId;
    nextEarningDate: Date;
    thisMonthEarnings: number;
    totalEarnings: number;
    category: mongoose.Types.ObjectId;
    viewsCount: number;
    likes: mongoose.Types.ObjectId[];
    dislikes: mongoose.Types.ObjectId[];
    viewers: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
    isBlocked: boolean;
}
declare const Post: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost> & IPost & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Post;
