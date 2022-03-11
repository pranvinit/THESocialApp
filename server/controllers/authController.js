const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

// utils imports
const { createTokenUser, attackCookieToResponse } = require("../utils");

const register = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.create(data);
    const tokenUser = createTokenUser(user);
    attackCookieToResponse({ user: tokenUser, res });

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    console.log(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "please provide correct email and password" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "please provide correct email and password" });
  }
  const tokenUser = createTokenUser(user);
  attackCookieToResponse({ user: tokenUser, res });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.send("logout route");
};

module.exports = {
  register,
  login,
  logout,
};
