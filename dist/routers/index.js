"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const post_1 = __importDefault(require("../controllers/post"));
const auth_1 = require("../middleware/auth");
const verifyUser_1 = require("../middleware/verifyUser");
router.post("/author", post_1.default.getPost);
router.post("/story", post_1.default.getStorys);
router.get("/detail_story/:id", post_1.default.getStory);
router.post("/search", post_1.default.searchPost);
router.post("/author/create", verifyUser_1.verifyUser, auth_1.authUser, post_1.default.createAuthor);
router.post("/story/create", verifyUser_1.verifyUser, auth_1.authUser, post_1.default.createStory);
module.exports = router;
