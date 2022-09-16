const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/userModel");

exports.isAuthUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  // console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this pages", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  // jwt token include both JWT_SECRET and user id which is decodeData here
  req.user = await User.findById(decodeData._id);
  next();
});
