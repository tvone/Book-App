"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt = require("bcrypt");
const User = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, age, password, cf_password } = req.body;
            console.log(name, email);
            if (name == "" ||
                email == "" ||
                age == "" ||
                password == "" ||
                cf_password == "") {
                return res.status(400).json({ msg: "Please fill information" });
            }
            if (!validateEmail(email))
                return res.status(400).json({ msg: "Email dont valid" });
            if (password.length < 6)
                return res.status(400).json({ msg: "Error password < 6" });
            if (password !== cf_password)
                return res.status(400).json({ msg: "Error password" });
            const checkEmail = yield UserModel_1.default.findOne({ email });
            if (checkEmail)
                return res.status(400).json({ msg: "Email already exists" });
            const hashPassword = yield bcrypt.hash(password, 10);
            const newUser = new UserModel_1.default({
                name,
                email,
                age,
                password: hashPassword,
            });
            newUser.save();
            res.json({ msg: "Create user success" });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cookie = req.signedCookies;
            const verifyToken = jwt.verify(cookie.refreshToken, process.env.SECRET_KEY);
            if (!verifyToken.id) {
                return res.status(400).json({ msg: "Incorrect Account !" });
            }
            const user = yield UserModel_1.default.findOne({ _id: verifyToken.id }).select("-password");
            if (!user)
                return res.status(400).json({ msg: "Incorrect Account !" });
            const accessToken = createAccessToken({ id: user._id });
            res.json({ user, accessToken });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            console.log(email);
            if (email == "" || password == "") {
                return res.status(400).json({ msg: "Please fill information" });
            }
            const user = yield UserModel_1.default.findOne({ email });
            const checkPassword = yield bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
            if (!checkPassword)
                return res
                    .status(400)
                    .json({ msg: "Incorrect account or password information" });
            const refreshToken = createRefreshToken({ id: user === null || user === void 0 ? void 0 : user._id });
            res.cookie("refreshToken", refreshToken, {
                path: "/api/refreshtoken",
                maxAge: 7 * 24 * 3600 * 1000,
                signed: true,
                httpOnly: true,
            });
            res.json({ msg: "Login Success" });
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }),
};
// Json WebToken :
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5m" });
};
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10m" });
};
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
};
// Valid Email
const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.default = User;
