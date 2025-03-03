import mongoose, { Document } from 'mongoose';
interface IProfanityFilter extends Document {
    bannedWords: string[];
}
declare const ProfanityFilter: mongoose.Model<IProfanityFilter, {}, {}, {}, mongoose.Document<unknown, {}, IProfanityFilter> & IProfanityFilter & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default ProfanityFilter;
