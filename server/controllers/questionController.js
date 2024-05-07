import Question from "../models/questionModel.js";
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

export const getAllQuestion = async (req, res, next) => {
  const question = await Question.find();

  res.status(200).json({
    status: "success",
    data: question,
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

export const postQuestion = async (req, res, next) => {
  // const sparkyRef = ref(storage, `image/${req.file.filename}`);

  // const metadata = {
  //   contentType: req.file.mimetype,
  // };

  // const snapshot = await uploadBytes(sparkyRef, req.file.buffer, metadata);

  // const downloadURL = await getDownloadURL(snapshot.ref);

  const question = await Question.create({
    title: req.body.title,
    question: req.body.question,
    image: req.downloadURL,
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    data: question,
  });
  next();
};

export const getQuestion = async (req, res, next) => {
  const data = await Question.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: data,
  });
  next();
};

export const updateQuestion = async (req, res, next) => {
  //   console.log(req.body);
  const data = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: data,
  });
  next();
};

export const deleteQuestion = async (req, res, next) => {
  const data = await Question.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: data,
  });
  next();
};
