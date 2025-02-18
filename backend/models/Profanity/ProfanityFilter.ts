import mongoose, { Schema, Document } from "mongoose";

interface IProfanityFilter extends Document {
  bannedWords: string[];
}

const profanityFilterSchema: Schema<IProfanityFilter> = new Schema(
  {
    bannedWords: [String],
  },
  { timestamps: true }
);

const ProfanityFilter = mongoose.model<IProfanityFilter>("ProfanityFilter", profanityFilterSchema);

export default ProfanityFilter;
