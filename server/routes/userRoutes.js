const express = require("express");
const router = express.Router();

// controller imports
const {
  showCurrentUser,
  getSingleUser,
  getAllUsers,
  updateUserPassword,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getUserFollowings,
} = require("../controllers/userController");

// middleware imports
const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(authenticateUser, getAllUsers);

router.route("/showUser").get(authenticateUser, showCurrentUser);
router.route("/:id/friends").get(authenticateUser, getUserFollowings);

router.route("/update-password").post(authenticateUser, updateUserPassword);

router
  .route("/:id")
  .get(getSingleUser)
  .put(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

router.route("/:id/follow").get(authenticateUser, followUser);
router.route("/:id/unfollow").get(authenticateUser, unfollowUser);

module.exports = router;
