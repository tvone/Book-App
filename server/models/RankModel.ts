import mongoose from "mongoose";
import IBRank from "../config/interface";

const Schema = mongoose.Schema;

const RankSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  age: {
    type: Number,
    require: true,
  },
  rank: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IBRank>("Rank", RankSchema);
