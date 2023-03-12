"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    age: {
        type: Number,
        require: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        trim: true,
        require: true,
    },
    cf_password: {
        type: String,
        trim: true,
        require: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("User", userSchema);
