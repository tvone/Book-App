import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { IBUser } from "../config/interface";
const userSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBUser>("User", userSchema);
