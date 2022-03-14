const express = require("express");
const router = express.Router();

// auth middleware imports
const { authenticateUser } = require("../middleware/authentication");

// controller imports
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");

router.route("/").post(authenticateUser, createMessage);
router.route("/:id").get(authenticateUser, getMessages);

module.exports = router;
