import mongoose, { Document } from 'mongoose';
interface ICategory extends Document {
    categoryName: string;
    description?: string;
    posts: mongoose.Types.ObjectId[];
    author: mongoose.Types.ObjectId;
}
declare const Category: mongoose.Model<ICategory, {}, {}, {}, mongoose.Document<unknown, {}, ICategory> & ICategory & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Category;
