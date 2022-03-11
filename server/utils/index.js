const createTokenUser = require("./createTokenUser");
const { createJWT, verifyJWT, attackCookieToResponse } = require("./jwt");
const checkAccess = require("./checkAccess");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");

module.exports = {
  createTokenUser,
  createJWT,
  verifyJWT,
  attackCookieToResponse,
  checkAccess,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
