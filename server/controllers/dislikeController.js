import DisLike from "../models/dislikeModel.js";

export const updatePostDisLike = async (req, res, next) => {
  try {
    // Retrieve the post ID from the request parameters
    const postId = req.params.id;

    // Retrieve the user ID from the request body (assuming it's included in the request)
    const userId = req.user._id; // Assuming the user ID is available in req.user._id

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "User ID is required to dislike a post.",
      });
    }

    // Find the post by ID
    const post = await DisLike.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found.",
      });
    }

    // Check if the user already liked the post
    if (post.dislike.userdisLiked.includes(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "User already disLiked the post.",
      });
    }

    // Add the user ID to the list of users who liked the post
    post.dislike.userdisLiked.push(userId);

    // Increment the number of likes
    post.dislike.count += 1;

    // Save the updated post
    await post.save();

    // Return the updated post
    res.status(200).json({
      status: "success",
      data: post,
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

export const deletePostDisLike = async (req, res, next) => {
  try {
    // Retrieve the post ID from the request parameters
    const postId = req.params.id;

    // Retrieve the user ID from the request body (assuming it's included in the request)
    const userId = req.user._id; // Assuming the user ID is available in req.user._id

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "User ID is required to dislike a post.",
      });
    }

    // Find the post by ID
    const post = await DisLike.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found.",
      });
    }

    // Construct a new array excluding the user ID
    const updatedDislikedUsers = post.dislike.userdisLiked.filter(
      (id) => id.toString() !== userId.toString()
    );

    // Update the userdisLiked array with the new array
    post.dislike.userdisLiked = updatedDislikedUsers;

    // Increment the number of likes
    post.dislike.count -= 1;

    // Save the updated post
    await post.save();

    // Return the updated post
    res.status(200).json({
      status: "success",
      data: post,
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
