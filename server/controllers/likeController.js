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

    let like = await Like.findOne({ postId });

    if (!like) {
      like = new Like({ post: postId, userLiked: [userId], count: 1 });
    } else {
      if (like.userLiked.includes(userId)) {
        return res.status(400).json({
          status: "fail",
          message: "User already liked the post.",
        });
      }
      like.userLiked.push(userId);
      like.count += 1;
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
    // Retrieve the post ID from the request parameters
    const postId = req.params.id;

    // Retrieve the user ID from the request body (assuming it's included in the request)
    const userId = req.user._id; // Assuming the user ID is available in req.user._id

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "User ID is required to like a post.",
      });
    }

    // Find the post by ID
    const post = await Like.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found.",
      });
    }

    // Add the user ID to the list of users who liked the post

    const like = await Like.find();

    const updateLikedUsers = like.like.userLiked.filter(
      (id) => id.toString() !== userId.toString()
    );

    like.like.userLiked = updateLikedUsers;

    // Increment the number of likes
    like.like.count -= 1;

    // Save the updated post
    await like.save();

    // Return the updated post
    res.status(200).json({
      status: "success",
      data: like,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};
