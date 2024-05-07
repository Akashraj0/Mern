import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
export const updatePostLike = async (req, res, next) => {
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

    let like = await Like.findOne({ post: postId });

    if (!like) {
      like = new Like({
        post: postId,
        like: { userLiked: [userId], count: 1 },
      });
    } else {
      if (like.like.userLiked.includes(userId)) {
        return res.status(400).json({
          status: "fail",
          message: "User already liked the post.",
        });
      }
      like.like.userLiked.push(userId);
      like.like.count += 1;
    }

    await like.save();

    res.status(200).json({
      status: "success",
      data: like,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

export const deletePostLike = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "User ID is required to unlike a post.",
      });
    }

    const like = await Like.findOne({ post: postId });

    if (
      !like ||
      !like.like.userLiked ||
      !like.like.userLiked.includes(userId)
    ) {
      return res.status(404).json({
        status: "fail",
        message: "Like not found or user hasn't liked the post.",
      });
    }

    like.like.userLiked = like.like.userLiked.filter(
      (id) => id.toString() !== userId.toString()
    );
    like.like.count -= 1;

    await like.save();

    res.status(200).json({
      status: "success",
      data: like,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
