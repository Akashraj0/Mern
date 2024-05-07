import mongoose from "mongoose";
// import validator from "validator";
// const validator = require("validator");
const QuestionShema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the description"],
    },
    question: {
      type: String,
      required: [true, "Please provide the description"],
      minlength: [30, "The paragraph must have minimum of 20 words"],
      maxlength: [300, "The paragraph must have maximum of 150 words"],
    },
    image: String,
    date: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "Post must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

QuestionShema.virtual("answers", {
  ref: "answers",
  foreignField: "question",
  localField: "_id",
});

QuestionShema.pre(/^find/, function () {
  this.populate({ path: "user", select: "name photo" }).populate({
    path: "answers",
  });
});

const Question = mongoose.model("questions", QuestionShema);

export default Question;
