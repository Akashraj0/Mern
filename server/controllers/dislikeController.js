import DisLike from "../models/dislikeModel.js";
import Post from "../models/postModel.js";

export const updatePostDisLike = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "User ID is required to like a post.",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found.",
      });
    }

    let dislike = await DisLike.findOne({ post: postId });

    if (!dislike) {
      dislike = new DisLike({
        post: postId,
        dislike: { userdisLiked: [userId], count: 1 },
      });
    } else {
      if (dislike.dislike.userdisLiked.includes(userId)) {
        return res.status(400).json({
          status: "fail",
          message: "User already liked the post.",
        });
      }
      dislike.dislike.userdisLiked.push(userId);
      dislike.dislike.count += 1;
    }

    await dislike.save();

    res.status(200).json({
      status: "success",
      data: dislike,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

export const deletePostDisLike = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "User ID is required to unlike a post.",
      });
    }

    const dislike = await DisLike.findOne({ post: postId });

    if (
      !dislike ||
      !dislike.dislike.userdisLiked ||
      !dislike.dislike.userdisLiked.includes(userId)
    ) {
      return res.status(404).json({
        status: "fail",
        message: "dislike not found or user hasn't disliked the post.",
      });
    }

    dislike.dislike.userdisLiked = dislike.dislike.userdisLiked.filter(
      (id) => id.toString() !== userId.toString()
    );
    dislike.dislike.count -= 1;

    await dislike.save();

    res.status(200).json({
      status: "success",
      data: dislike,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
