import express from "express";
import { signup, login, protect } from "../controllers/authController.js";
import {
  getUser,
  getAllUser,
  deleteUser,
} from "../controllers/userController.js";
const Router = express.Router();
Router.route("/signup").post(signup);
Router.route("/login").post(login);

Router.route("/").get(protect, getAllUser);

Router.route("/:id").get(getUser).delete(deleteUser);

export default Router;
