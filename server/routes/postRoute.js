import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  userImageUpload,
  resizeUserPhoto,
  postPost,
  updatePostLike,
  updatePostDisLike,
  deletePostDisLike,
  deletePostLike,
} from "../controllers/postController.js";
const router = express.Router();
router
  .route("/")
  .get(getAllPost)
  .post(protect, userImageUpload, resizeUserPhoto, postPost);

router
  .route("/:id")
  .get(getPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

router.route("/like/:id").patch(protect, updatePostLike);
router.route("/dislike/:id").patch(protect, updatePostDisLike);

router.route("/like/delete/:id").patch(protect, deletePostLike);
router.route("/dislike/delete/:id").patch(protect, deletePostDisLike);
export default router;
