import User from "../models/userModel.js";
import catchAsync from "./../utility/catchAsync.js";
import AppError from "./../utility/appError.js";

export const getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find()
    .populate({
      path: "posts",
      populate: {
        path: "comments", // Populate comments within posts
      },
    })
    .populate({
      path: "questions",
    });

  //make sure that only admin colud access the users
  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.find({ _id: req.params.id })
    .populate({
      path: "posts",
      populate: {
        path: "comments", // Populate comments within posts
      },
    })
    .populate({
      path: "questions",
    });

  if (!user) return next(new AppError("the user does not exist", 400));

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.deleteOne(req.body);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
