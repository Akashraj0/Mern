import express from "express";
import { protect } from "../controllers/authController.js";
import {
  updatePostLike,
  deletePostLike,
} from "../controllers/likeController.js";
import {
  updatePostDisLike,
  deletePostDisLike,
} from "../controllers/dislikeController.js";
const router = express.Router();

router.route("/like/:id").patch(protect, updatePostLike);
router.route("/dislike/:id").patch(protect, updatePostDisLike);

router.route("/like/delete/:id").patch(protect, deletePostLike);
router.route("/dislike/delete/:id").patch(protect, deletePostDisLike);

export default router;
