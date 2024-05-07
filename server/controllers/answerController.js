// const Answer = require("../models/answerModel");
import Answer from "../models/answerModel.js";

export const getAllAnswer = async (req, res, next) => {
  const answer = await Answer.find().populate({ path: "user" }).populate({
    path: "post",
    select: "post",
  });

  res.status(200).json({
    status: "success",
    data: answer,
  });
};

export const getAnswer = async (req, res, next) => {
  const answer = await Answer.findById(req.params.id)
    .populate({ path: "user" })
    .populate({
      path: "post",
      select: "post",
    });

  res.status(200).json({
    status: "success",
    data: answer,
  });
};

export const postAnswer = async (req, res, next) => {
  console.log(req.body);
  const answer = await Answer.create({
    answer: req.body.answer,
    user: req.user._id,
    post: req.params.id,
  });
  res.status(200).json({
    status: "success",
    data: answer,
  });
};

export const updateAnswer = async (req, res, next) => {
  const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: answer,
  });
};

export const deleteAnswer = async (req, res, next) => {
  const answer = await Answer.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
};
