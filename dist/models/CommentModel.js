"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const CommentModel = new mongoose_2.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        trim: true,
        require: true,
    },
    likes: [{ type: mongoose_1.default.Types.ObjectId, ref: "User" }],
    reply: [{ type: mongoose_1.default.Types.ObjectId, ref: "Comment" }],
    reply_user: mongoose_1.default.Types.ObjectId,
    post_id: mongoose_1.default.Types.ObjectId,
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Comment", CommentModel);
