import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { IAuthor } from "../config/interface";
const AuthorModel = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

export default mongoose.model<IAuthor>("Author", AuthorModel);
