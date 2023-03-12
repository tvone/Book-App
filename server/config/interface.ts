import { Document, Types } from "mongoose";

export interface IBRank {
  name: string;
  age: number;
  rank: string;
}

export interface IBUser {
  name: string;
  password: string;
  age: number;
  role: number;
  stories: [Types.ObjectId];
}

export interface IStory {
  author: Types.ObjectId;
  title: string;
  fans: string[];
}

export interface IComment extends Document {
  user: Types.ObjectId;
  content: String;
  likes: string[];
  reply: string[];
  post_id: string;
  _doc: object;
}

export interface IDecodeToken {
  id?: string;
  iat: number;
  exp: number;
}
export interface IAuthor {
  name: string;
  age: number;
  stories: [Types.ObjectId];
}
