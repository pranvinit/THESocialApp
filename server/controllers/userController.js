const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, attackCookieToResponse } = require("../utils");

const showCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({ user });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No user with id ${userId}` });
    }
    const tokenUser = createTokenUser(user);
    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort("-createdAt");
    res.status(StatusCodes.OK).json({ users, nbHits: users.length });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const data = req.body;
  const { password, ...safeData } = data;
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, safeData, {
      runValidators: true,
      new: true,
    });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No user with id ${userId}` });
    }

    const tokenUser = createTokenUser(user);
    attackCookieToResponse({ res, tokenUser });
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const updateUserPassword = async (req, res) => {
  const { id: userId } = req.params;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide both the values" });
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No user with id ${userId}` });
    }
    const isPasswordCorrect = user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "please provide correct old password" });
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: "password updated successfully" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No user with id ${userId}` });
    }
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// follow & unfollow user routes
const followUser = async (req, res) => {
  const { id: friendId } = req.params;
  if (friendId === req.user._id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "you cannot follow yourself" });
  }
  try {
    const user = await User.findOne({ _id: req.user._id });
    const friend = await User.findOne({ _id: friendId });

    if (friend.followers.includes(user._id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "you already follow this user" });
    }
    await friend.updateOne({ $push: { followers: user._id } });
    await user.updateOne({ $push: { followings: friend._id } });
    res.status(StatusCodes.OK).json({ msg: "user has been followed" });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const unfollowUser = async (req, res) => {
  const { id: friendId } = req.params;
  if (friendId === req.user._id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "you cannot follow yourself" });
  }
  try {
    const user = await User.findOne({ _id: req.user._id });
    const friend = await User.findOne({ _id: friendId });

    if (!friend.followers.includes(user._id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "you do not follow this user" });
    }
    await friend.updateOne({ $pull: { followers: user._id } });
    await user.updateOne({ $pull: { followings: friend._id } });
    res.status(StatusCodes.OK).json({ msg: "user has been followed" });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// get user followings
const getUserFollowings = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const currentUser = await User.findOne({ _id: userId });
    const followings = await Promise.all(
      currentUser.followings.map((f) => {
        return User.findOne({ _id: f }).select("-password");
      })
    );

    const followers = await Promise.all(
      currentUser.followers.map((f) => {
        return User.findOne({ _id: f }).select("_id");
      })
    );

    res
      .status(StatusCodes.OK)
      .json({ followings, followers, hbHits: followings.length });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  updateUserPassword,
  followUser,
  unfollowUser,
  showCurrentUser,
  getUserFollowings,
};
