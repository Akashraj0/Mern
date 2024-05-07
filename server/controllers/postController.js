import Post from "../models/postModel.js";
import multer from "multer";
import sharp from "sharp";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmBhvyzu0tK_NowU4QDgp8_U2s3QYqoZ0",
  authDomain: "cosmobuzz-s.firebaseapp.com",
  projectId: "cosmobuzz-s",
  storageBucket: "cosmobuzz-s.appspot.com",
  messagingSenderId: "204491008180",
  appId: "1:204491008180:web:786cb3640f269dbff40fe1",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

const storageRef = ref(storage);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, files, cb) => {
  if (files.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! please upload only image.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const getAllPost = async (req, res, next) => {
  const post = await Post.find().populate({ path: "user" }).populate({
    path: "comments",
    // select: "answer",
  });

  res.status(200).json({
    status: "success",
    data: post,
  });
  next();
};

export const userImageUpload = upload.single("image");

export const resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 });

  const sparkyRef = ref(storage, `image/${req.file.filename}`);

  const metadata = {
    contentType: req.file.mimetype,
  };

  const snapshot = await uploadBytes(sparkyRef, req.file.buffer, metadata);

  const downloadURL = await getDownloadURL(snapshot.ref);

  req.downloadURL = downloadURL;
  next();
};

export const postPost = async (req, res, next) => {
  // const sparkyRef = ref(storage, `image/${req.file.filename}`);

  // const metadata = {
  //   contentType: req.file.mimetype,
  // };

  // const snapshot = await uploadBytes(sparkyRef, req.file.buffer, metadata);

  // const downloadURL = await getDownloadURL(snapshot.ref);

  const post = await Post.create({
    title: req.body.title,
    post: req.body.post,
    image: req.downloadURL,
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    data: post,
  });
  next();
};

export const getPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({ path: "user" })
    .populate({
      path: "comments",
      select: "comment",
    });

  res.status(200).json({
    status: "success",
    data: post,
  });
  next();
};

export const updatePost = async (req, res, next) => {
  console.log(req.body);
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: post,
  });
  next();
};

export const updatePostLike = async (req, res, next) => {
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
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found.",
      });
    }

    // Check if the user already liked the post
    if (post.like.userLiked.includes(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "User already liked the post.",
      });
    }

    // Add the user ID to the list of users who liked the post
    post.like.userLiked.push(userId);

    // Increment the number of likes
    post.like.count += 1;

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
    const post = await Post.findById(postId);

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

export const deletePost = async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: post,
  });
  next();
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
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found.",
      });
    }

    // Add the user ID to the list of users who liked the post

    const updateLikedUsers = post.like.userLiked.filter(
      (id) => id.toString() !== userId.toString()
    );

    post.like.userLiked = updateLikedUsers;

    // Increment the number of likes
    post.like.count -= 1;

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
    const post = await Post.findById(postId);

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
