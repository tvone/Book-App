"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.default = mongoose_1.default.model("Author", AuthorModel);
