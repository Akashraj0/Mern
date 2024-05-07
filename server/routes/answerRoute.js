import express from "express";
import { protect } from "../controllers/authController.js";
import {
  getAllAnswer,
  getAnswer,
  postAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answerController.js";
const router = express.Router();

router.route("/").get(getAllAnswer);

router
  .route("/:id")
  .post(protect, postAnswer)
  .get(getAnswer)
  .patch(updateAnswer)
  .delete(deleteAnswer);

export default router;
