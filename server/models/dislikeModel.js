import mongoose from "mongoose";

const dislikeSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "posts",
      required: [true, "Post must belong to a user"],
    },
    dislike: {
      type: {
        userdisLiked: {
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

const Dislike = mongoose.model("dislikes", dislikeSchema);

export default Dislike;
