import mongoose from "mongoose";
import { Request, Response } from "express";
import CommentModel from "../models/CommentModel";
import StoryModel from "../models/StoryModel";
import { io } from "../app";
import UserModel from "../models/UserModel";
// Custom Types Request Express

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id?: string;
    };
  }
}
const Comment = {
  createComment: async (req: Request, res: Response) => {
    try {
      const { content, post_id } = req.body;

      const newComment = new CommentModel({
        user: req.user?.id,
        content,
        post_id,
      });
      await StoryModel.findOneAndUpdate(
        { _id: post_id },
        {
          $push: { comments: newComment._id },
        }
      );
      const user = await UserModel.findOne({ _id: req.user?.id });
      const data = {
        ...newComment._doc,
        user,
      };
      console.log(data);
      io.to(`${post_id}`).emit("create_comment", data);
      await newComment.save();
      res.json({ newComment });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default Comment;
