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
} = require("../controllers/userController");

// middleware imports
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");

router
  .route("/")
  .get([authenticateUser, authorizePermission("admin")], getAllUsers);

router.route("/showUser").get(authenticateUser, showCurrentUser);

router.route("/update-password").post(authenticateUser, updateUserPassword);

router
  .route("/:id")
  .get(getSingleUser)
  .put(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

router.route("/:id/follow").get(authenticateUser, followUser);
router.route("/:id/unfollow").get(authenticateUser, unfollowUser);

module.exports = router;
