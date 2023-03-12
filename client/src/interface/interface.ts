export interface IAuthor {
  _id: string;
  name: string;
  email: string;
  age: number;
  role: number;
  stories: [];
}

export interface IStory {
  _id: string;
  title: string;
  author: IAuthor;
  comments: [];
  fans: [];
}

export interface IAuth {
  auth: { user: IAuthor; accessToken: string };
  isLogged: boolean;
  isAdmin: boolean;
}

export interface IDecodeToken {
  id: string;
  exp: number;
  iat: number;
}

export interface IComment {
  user: IAuthor;
  content: string;
  like: [];
  reply: [];
  post_id: string;
  createdAt: Date;
}
