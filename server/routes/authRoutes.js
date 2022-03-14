const express = require("express");
const router = express.Router();

// controller imports
const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// middleware imports
const { authenticateUser } = require("../middleware/authentication");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authenticateUser, logout);

// auth MISC
router.route("/verify-email").post(authenticateUser, verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

module.exports = router;
