import mongoose from "mongoose";

const LikeSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "posts",
      required: [true, "Post must belong to user"],
    },
    like: {
      type: {
        userLiked: {
          type: [mongoose.Schema.ObjectId],
          default: [],
        },
        count: {
          type: Number,
          default: 0,
        },
      },
      default: {},
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Like = mongoose.model("likes", LikeSchema);

export default Like;
