import express from "express";
import Comment from "../controllers/comment";
import User from "../controllers/user";
import { verifyUser } from "../middleware/verifyUser";
const router = express.Router();

router.post("/register", User.register);
router.get("/refreshtoken", User.refreshToken);
router.post("/login", User.login);
router.post("/comment", verifyUser, Comment.createComment);

module.exports = router;
