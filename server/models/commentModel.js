import mongoose from "mongoose";
const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Please provide the comment"],
      minlength: [5, "The paragraph must have minimum of 20 words"],
      maxlength: [300, "The paragraph must have maximum of 150 words"],
    },
    image: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "comment must belong to a user"],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "posts",
      required: [true, "comment must belong to a post"],
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function () {
  this.populate({ path: "user", select: "name photo" });
});

const comment = mongoose.model("comments", commentSchema);

export default comment;
