import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IComment } from "../config/interface";

const CommentModel = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
      require: true,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    reply: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    reply_user: mongoose.Types.ObjectId,
    post_id: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IComment>("Comment", CommentModel);
