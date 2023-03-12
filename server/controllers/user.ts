import { Response, Request } from "express";
import mongoose, { ObjectId } from "mongoose";
const jwt = require("jsonwebtoken");
import UserModel from "../models/UserModel";
const bcrypt = require("bcrypt");
import { IDecodeToken } from "../config/interface";
const User = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, age, password, cf_password } = req.body;
      console.log(name, email);
      if (
        name == "" ||
        email == "" ||
        age == "" ||
        password == "" ||
        cf_password == ""
      ) {
        return res.status(400).json({ msg: "Please fill information" });
      }
      if (!validateEmail(email))
        return res.status(400).json({ msg: "Email dont valid" });
      if (password.length < 6)
        return res.status(400).json({ msg: "Error password < 6" });
      if (password !== cf_password)
        return res.status(400).json({ msg: "Error password" });

      const checkEmail = await UserModel.findOne({ email });

      if (checkEmail)
        return res.status(400).json({ msg: "Email already exists" });
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        name,
        email,
        age,
        password: hashPassword,
      });
      newUser.save();
      res.json({ msg: "Create user success" });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const cookie = req.signedCookies;
      const verifyToken: IDecodeToken = jwt.verify(
        cookie.refreshToken,
        process.env.SECRET_KEY
      );

      if (!verifyToken.id) {
        return res.status(400).json({ msg: "Incorrect Account !" });
      }
      const user = await UserModel.findOne({ _id: verifyToken.id }).select(
        "-password"
      );
      if (!user) return res.status(400).json({ msg: "Incorrect Account !" });
      const accessToken = createAccessToken({ id: user._id });
      res.json({ user, accessToken });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      if (email == "" || password == "") {
        return res.status(400).json({ msg: "Please fill information" });
      }
      const user = await UserModel.findOne({ email });
      const checkPassword = await bcrypt.compare(password, user?.password);
      if (!checkPassword)
        return res
          .status(400)
          .json({ msg: "Incorrect account or password information" });
      const refreshToken = createRefreshToken({ id: user?._id });
      res.cookie("refreshToken", refreshToken, {
        path: "/api/refreshtoken",
        maxAge: 7 * 24 * 3600 * 1000,
        signed: true,
        httpOnly: true,
      });
      res.json({ msg: "Login Success" });
    } catch (error: any) {
      res.status(500).json({ msg: error.message });
    }
  },
};

// Json WebToken :
const createActivationToken = (payload: object) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5m" });
};
const createAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10m" });
};
const createRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
};
// Valid Email
const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export default User;
