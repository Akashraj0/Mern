import Comment from "../models/commentModel.js";

export const getAllComment = async (req, res, next) => {
  const comment = await Comment.find().populate({ path: "user" }).populate({
    path: "post",
    select: "post",
  });

  res.status(200).json({
    status: "success",
    data: comment,
  });
};

export const getComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
    .populate({ path: "user" })
    .populate({
      path: "post",
      select: "post",
    });

  res.status(200).json({
    status: "success",
    data: comment,
  });
};

export const postComment = async (req, res, next) => {
  console.log(req.body);
  const comment = await Comment.create({
    comment: req.body.comment,
    user: req.user._id,
    post: req.params.id,
  });
  res.status(200).json({
    status: "success",
    data: comment,
  });
};

export const updateComment = async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: comment,
  });
};

export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: null,
  });
};
