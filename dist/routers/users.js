"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = __importDefault(require("../controllers/comment"));
const user_1 = __importDefault(require("../controllers/user"));
const verifyUser_1 = require("../middleware/verifyUser");
const router = express_1.default.Router();
router.post("/register", user_1.default.register);
router.get("/refreshtoken", user_1.default.refreshToken);
router.post("/login", user_1.default.login);
router.post("/comment", verifyUser_1.verifyUser, comment_1.default.createComment);
module.exports = router;
