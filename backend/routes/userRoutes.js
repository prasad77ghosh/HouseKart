const express = require("express");
const {
  Register,
  loginUser,
  logOutUser,
  forgotPassword,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logOutUser);

module.exports = router;
