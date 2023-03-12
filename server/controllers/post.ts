import { Request, Response, NextFunction } from "express";
import { Document, Types } from "mongoose";
import mongoose from "mongoose";
import Rank from "../models/RankModel";
import StoryModel from "../models/StoryModel";
import AuthorModel from "../models/AuthorModel";

const Post = {
  getPost: async (req: Request, res: Response) => {
    try {
      const author = await AuthorModel.find().populate({
        path: "stories",
        options: { limit: 2 },
      });
      res.json(author);
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
  getStorys: async (req: Request, res: Response) => {
    try {
      const story = await StoryModel.find()
        .populate("author", "name age")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json(story);
    } catch (error: any) {
      res.json({ msg: error.message });
    }
  },

  getStory: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const story = await StoryModel.findById(id)
        .populate("author", "name age")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.json(story);
    } catch (error: any) {
      res.json({ msg: error.message });
    }
  },
  createAuthor: (req: Request, res: Response) => {
    try {
      const { name, age } = req.body;

      if (name == "" || age == "")
        return res.status(400).json({ msg: "Please fill information author" });

      const newAuthor = new AuthorModel({
        name,
        age,
      });
      newAuthor.save();
      res.json("Add new success " + newAuthor);
    } catch (error: any) {
      res.json({ msg: error.message });
    }
  },
  createStory: async (req: Request, res: Response) => {
    try {
      const { title, author } = req.body;

      const newStory = new StoryModel({
        title,
        author,
      });
      newStory.save();

      const check = await AuthorModel.find({
        _id: author,
        stories: author,
      });

      console.log("check : " + check);
      if (check.length > 0)
        return res.status(400).json({ msg: "Post is exist" });
      const update = await AuthorModel.findOneAndUpdate(
        { _id: author },
        {
          $push: { stories: newStory._id },
        },
        {
          new: true,
        }
      );
      StoryModel.find({ author }).exec(function (err, stories) {
        if (err) return console.log(err);
        console.log("The stories are an array: ", stories);
      });

      res.json("Add new success " + newStory + update);
    } catch (error: any) {
      res.json({ msg: error.message });
    }
  },
  searchPost: async (req: Request, res: Response) => {
    try {
      const view = await AuthorModel.aggregate([
        {
          // $match: { age: { $gte: 20 }, rank: "Captain" },
          // $project: { _id: 0, name: 1, rank: 1 },
          // $group: { _id: null, totaldocs: { $max: "$age" } },
          // $sort: { age: 1 },
          // $unwind: "$name",
          // $count: "total_documents",
          $match: { age: 37 },
        },
      ]);
      res.json(view);
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

export default Post;
