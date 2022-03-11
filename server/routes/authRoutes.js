const express = require("express");
const router = express.Router();

// controller imports
const {
  register,
  login,
  logout,
  verifyEmail,
} = require("../controllers/authController");

// middleware imports
const { authenticateUser } = require("../middleware/authentication");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authenticateUser, logout);
router.route("/verify-email").post(authenticateUser, verifyEmail);

module.exports = router;
