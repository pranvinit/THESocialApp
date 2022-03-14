const express = require("express");
const router = express.Router();

// auth middleware imports
const { authenticateUser } = require("../middleware/authentication");

// controller imports
const {
  createConversation,
  getConversation,
} = require("../controllers/conversationController");

router.route("/").post(authenticateUser, createConversation);

router.route("/:id").get(authenticateUser, getConversation);

module.exports = router;
