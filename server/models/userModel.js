import mongoose from "mongoose";
import validator from "validator";
import bycrpt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "Please provide valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide us a password"],
      minlength: [8, "The password should be min of 8 charater"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide us a password"],
      minlength: [8, "The password should be min of 8 charater"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "The Password are not same!",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    photo: {
      type: String,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("posts", {
  ref: "posts",
  foreignField: "user",
  localField: "_id",
});

// userSchema.virtual("answers", {
//   ref: "answers",
//   foreignField: "post",
//   localField: "posts",
// });

// userSchema.pre(/^find/, function () {

// });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bycrpt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password" || this.isNew)) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bycrpt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

const User = mongoose.model("user", userSchema);

export default User;
