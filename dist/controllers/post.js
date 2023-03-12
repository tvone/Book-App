"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StoryModel_1 = __importDefault(require("../models/StoryModel"));
const AuthorModel_1 = __importDefault(require("../models/AuthorModel"));
const Post = {
    getPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const author = yield AuthorModel_1.default.find().populate({
                path: "stories",
                options: { limit: 2 },
            });
            res.json(author);
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    getStorys: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const story = yield StoryModel_1.default.find()
                .populate("author", "name age")
                .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password",
                },
            });
            res.json(story);
        }
        catch (error) {
            res.json({ msg: error.message });
        }
    }),
    getStory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const story = yield StoryModel_1.default.findById(id)
                .populate("author", "name age")
                .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password",
                },
            });
            res.json(story);
        }
        catch (error) {
            res.json({ msg: error.message });
        }
    }),
    createAuthor: (req, res) => {
        try {
            const { name, age } = req.body;
            if (name == "" || age == "")
                return res.status(400).json({ msg: "Please fill information author" });
            const newAuthor = new AuthorModel_1.default({
                name,
                age,
            });
            newAuthor.save();
            res.json("Add new success " + newAuthor);
        }
        catch (error) {
            res.json({ msg: error.message });
        }
    },
    createStory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, author } = req.body;
            const newStory = new StoryModel_1.default({
                title,
                author,
            });
            newStory.save();
            const check = yield AuthorModel_1.default.find({
                _id: author,
                stories: author,
            });
            console.log("check : " + check);
            if (check.length > 0)
                return res.status(400).json({ msg: "Post is exist" });
            const update = yield AuthorModel_1.default.findOneAndUpdate({ _id: author }, {
                $push: { stories: newStory._id },
            }, {
                new: true,
            });
            StoryModel_1.default.find({ author }).exec(function (err, stories) {
                if (err)
                    return console.log(err);
                console.log("The stories are an array: ", stories);
            });
            res.json("Add new success " + newStory + update);
        }
        catch (error) {
            res.json({ msg: error.message });
        }
    }),
    searchPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const view = yield AuthorModel_1.default.aggregate([
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
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
};
exports.default = Post;
