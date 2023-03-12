import express from "express";
const router = express.Router();
import Post from "../controllers/post";
import { authUser } from "../middleware/auth";
import { verifyUser } from "../middleware/verifyUser";

router.post("/author", Post.getPost);
router.post("/story", Post.getStorys);
router.get("/detail_story/:id", Post.getStory);
router.post("/search", Post.searchPost);
router.post("/author/create", verifyUser, authUser, Post.createAuthor);
router.post("/story/create", verifyUser, authUser, Post.createStory);

module.exports = router;
