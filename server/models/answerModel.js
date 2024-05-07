import mongoose from "mongoose";
const answerSchema = mongoose.Schema(
  {
    answer: {
      type: String,
      required: [true, "Please provide the answer"],
      minlength: [5, "The paragraph must have minimum of 20 words"],
      maxlength: [300, "The paragraph must have maximum of 150 words"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "Answer must belong to a user"],
    },
    question: {
      type: mongoose.Schema.ObjectId,
      ref: "posts",
      required: [true, "Answer must belong to a Question"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

answerSchema.pre(/^find/, function () {
  this.populate({ path: "user", select: "name photo" });
});

const Answer = mongoose.model("answers", answerSchema);

export default Answer;
