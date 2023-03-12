"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jwt = require("jsonwebtoken");
const verifyUser = (req, res, next) => {
    try {
        const user = req.headers.authorization;
        if (!user)
            return res.status(400).json({ msg: "Please login now !" });
        jwt.verify(user, process.env.SECRET_KEY, (err, user) => {
            if (err)
                throw err;
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
exports.verifyUser = verifyUser;
