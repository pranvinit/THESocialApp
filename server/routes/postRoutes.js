const express = require("express");
const router = express.Router();

// controller imports
const {
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  timelinePosts,
  getUsersPosts,
} = require("../controllers/postController");

// middleware imports
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");

router.route("/").post(authenticateUser, createPost);

router.route("/timeline").get(authenticateUser, timelinePosts);
router.route("/profile/:id").get(authenticateUser, getUsersPosts);
router.route("/:id/like").put(authenticateUser, likePost);

router
  .route("/:id")
  .get(authenticateUser, getSinglePost)
  .put(authenticateUser, updatePost)
  .delete([authenticateUser, authorizePermission("admin")], deletePost);

module.exports = router;
