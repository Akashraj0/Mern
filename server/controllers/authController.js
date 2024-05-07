import { promisify } from "util";
import JWT from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utility/catchAsync.js";
import AppError from "../utility/appError.js";

const sign = (id) => {
  return JWT.sign({ id }, process.env.JWT_S, {
    expiresIn: process.env.JWT_E,
  });
};

const createSendToken = (user, statuscode, res) => {
  const token = sign(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;

  res.cookie("jwt", token, cookieOptions);

  res.status(statuscode).json({ data: user, token });
};

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  createSendToken(user, 200, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password does not exist send error message
  if (!email || !password) {
    return next(new AppError("Please Provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  //check does token exist
  if (!token) {
    return next(new AppError("you are not logged in please Login", 400));
  }

  //check the token validity
  const decoded = await promisify(JWT.verify)(token, process.env.JWT_S);

  //check if user still exist
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user beloning to this token does no longer exist.", 401)
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User Recently changed password! please log in again", 401)
    );
  }

  req.user = currentUser;
  next();
});
