import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getAllComment,
  getComment,
  postComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
const router = express.Router();

router.route("/").get(getAllComment);

router
  .route("/:id")
  .post(protect, postComment)
  .get(getComment)
  .patch(updateComment)
  .delete(deleteComment);

export default router;
