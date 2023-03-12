"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
    comments: [{ type: mongoose_1.default.Types.ObjectId, ref: "Comment" }],
});
exports.default = mongoose_1.default.model("Story", StoryModel);
