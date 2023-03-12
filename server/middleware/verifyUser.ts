import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

// Custom Types Request Express
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id?: string;
    };
  }
}
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.headers.authorization;

    if (!user) return res.status(400).json({ msg: "Please login now !" });
    jwt.verify(user, process.env.SECRET_KEY, (err: any, user: object) => {
      if (err) throw err;
      req.user = user;
      next();
    });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
