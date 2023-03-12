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
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
const StoryModel_1 = __importDefault(require("../models/StoryModel"));
const app_1 = require("../app");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const Comment = {
    createComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { content, post_id } = req.body;
            const newComment = new CommentModel_1.default({
                user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                content,
                post_id,
            });
            yield StoryModel_1.default.findOneAndUpdate({ _id: post_id }, {
                $push: { comments: newComment._id },
            });
            const user = yield UserModel_1.default.findOne({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id });
            const data = Object.assign(Object.assign({}, newComment._doc), { user });
            console.log(data);
            app_1.io.to(`${post_id}`).emit("create_comment", data);
            yield newComment.save();
            res.json({ newComment });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
};
exports.default = Comment;
