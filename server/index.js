/* eslint-disable */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import answerRouter from "./routes/answerRoute.js";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes//commentRoute.js";
import globalErrorHandler from "./controllers/errorController.js";
import signRouter from "./routes/ldRouter.js";
import questionRouter from "./routes/questionRouter.js";
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose.connect(DB).then(() => {
  console.log("DB is Connected");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/answers", answerRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/sign", signRouter);
app.listen(8000, () => {
  console.log("The server is running...");
});

app.use(globalErrorHandler);
