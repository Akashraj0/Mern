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

export default router;
