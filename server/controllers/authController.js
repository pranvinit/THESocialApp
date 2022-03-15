const User = require("../models/UserModel");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

// utils imports
const {
  createTokenUser,
  attackCookieToResponse,
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils");

const register = async (req, res) => {
  const data = req.body;
  try {
    // creates a dynamic hex token
    data.verificationToken = crypto.randomBytes(40).toString("hex");
    const user = await User.create(data);

    await sendVerificationEmail({
      name: user.username,
      email: user.email,
      verificationToken: user.verificationToken,
      origin: process.env.ORIGIN,
    });
    const tokenUser = createTokenUser(user);
    attackCookieToResponse({ user: tokenUser, res });

    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
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
        .json({ msg: "please verify your email to login" });
    }
    const tokenUser = createTokenUser(user);
    attackCookieToResponse({ user: tokenUser, res });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
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
        .json({ msg: "invalid email or token" });
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide an email address" });
  }
  const user = await User.findOne({ email });
  // do not let the client know if the email is valid
  if (user) {
    const passwordToken = crypto.randomBytes(40).toString("hex");
    const fifteenMinutes = 1000 * 60 * 15;
    const passwordExpirationDate = new Date(Date.now() + fifteenMinutes);
    await user.updateOne({ passwordToken, passwordExpirationDate });
    await sendResetPasswordEmail({
      to: user.email,
      email: user.email,
      token: passwordToken,
      origin: process.env.ORIGIN,
      name: user.username,
    });
  }
  res.status(StatusCodes.OK).json({ msg: "check email to reset the password" });
};

const resetPassword = async (req, res) => {
  const { passwordToken, email, password } = req.body;
  if (!passwordToken || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all the values" });
  }

  console.log(passwordToken, email, password);
  try {
    const user = await User.findOne({ email });
    if (user) {
      const currentDate = new Date();
      if (
        user.passwordToken === passwordToken &&
        user.passwordExpirationDate > currentDate
      ) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await user.updateOne({
          password: hashedPassword,
          passwordToken: "",
          passwordExpirationDate: null,
        });
      }
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "password was changed successfully" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
