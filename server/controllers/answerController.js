import Answer from "../models/answerModel.js";

export const getAllAnswer = async (req, res, next) => {
  const answer = await Answer.find();
  res.status(200).json({
    status: "success",
    data: answer,
  });
};

export const getAnswer = async (req, res, next) => {
  const answer = await Answer.findOne({ question: req.params.id });

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
    question: req.params.id,
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
