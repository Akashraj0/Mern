import mongoose from "mongoose";
import validator from "validator";
// const validator = require("validator");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the description"],
    },
    post: {
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
// postSchema.index({ user: 1, like: 1 }, { unique: 1 });
// postSchema.index({ user: 1, dislike: 1 }, { unique: 1 });
postSchema.virtual("comments", {
  ref: "comments",
  foreignField: "post",
  localField: "_id",
});

postSchema.virtual("likes", {
  ref: "likes",
  foreignField: "post",
  localField: "_id",
});

postSchema.virtual("dislikes", {
  ref: "dislikes",
  foreignField: "post",
  localField: "_id",
});

postSchema.pre(/^find/, function () {
  this.populate({ path: "user", select: "name photo" })
    .populate({ path: "likes" })
    .populate({ path: "dislikes" });
});

const Post = mongoose.model("posts", postSchema);

export default Post;
