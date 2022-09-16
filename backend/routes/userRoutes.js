const express = require("express");
const { Register, loginUser, logOutUser } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);

module.exports = router;
