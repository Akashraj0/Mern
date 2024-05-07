import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getAllQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  userImageUpload,
  resizeUserPhoto,
  postQuestion,
} from "../controllers/questionController.js";
const router = express.Router();
router
  .route("/")
  .get(getAllQuestion)
  .post(protect, userImageUpload, resizeUserPhoto, postQuestion);

router
  .route("/:id")
  .get(getQuestion)
  .patch(protect, updateQuestion)
  .delete(protect, deleteQuestion);

export default router;
