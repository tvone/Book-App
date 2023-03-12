import mongoose from "mongoose";
const { Schema } = mongoose;
import { IStory } from "../config/interface";
const StoryModel = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },
  title: {
    type: String,
    trim: true,
  },
  fans: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model<IStory>("Story", StoryModel);
