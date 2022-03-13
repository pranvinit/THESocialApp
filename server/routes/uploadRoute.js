const express = require("express");
const router = express.Router();

// controller imports
const uploadPostImage = require("../controllers/uploadController");

router.route("/").post(uploadPostImage);

module.exports = router;
