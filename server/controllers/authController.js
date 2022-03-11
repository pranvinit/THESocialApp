const User = require("../models/UserModel");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");

// utils imports
const { createTokenUser, attackCookieToResponse } = require("../utils");

const register = async (req, res) => {
  const data = req.body;
  try {
    // creates a dynamic hex token
    data.verificationToken = crypto.randomBytes(40).toString("hex");
    const user = await User.create(data);
    const tokenUser = createTokenUser(user);
    attackCookieToResponse({ user: tokenUser, res });

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
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
  if (!user.isVerified) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "user is not authorized" });
  }
  const tokenUser = createTokenUser(user);
  attackCookieToResponse({ user: tokenUser, res });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "please provide correct email and password" });
    }
    if (user.verificationToken !== verificationToken) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "user is not authorized" });
    }
    await user.updateOne({
      isVerified: true,
      verificationToken: "",
      verified: Date.now(),
    });
    res.status(StatusCodes.OK).json({ msg: "email verified successfully" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
};
