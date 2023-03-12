import { NextFunction, Request, Response } from "express";
import UserModel from "../models/UserModel";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user?.id;
    const check = await UserModel.findById(user);
    if (check?.role !== 1) {
      return res.status(400).json({ msg: "You do not admin" });
    }
    next();
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};
