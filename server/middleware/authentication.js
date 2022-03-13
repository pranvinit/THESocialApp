const { verifyJWT } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "user is not authorized" });
  }
  try {
    const {
      _id,
      username,
      profilePicture,
      email,
      city,
      from,
      relationship,
      role,
    } = verifyJWT(token);
    req.user = {
      _id,
      username,
      profilePicture,
      email,
      city,
      from,
      relationship,
      role,
    };
    next();
  } catch (err) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "user is not authorized" });
  }
};
// receives an array of roles and authorizes the user
const authorizePermission = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "user is not authorized" });
    }
    // proceed if user role had access
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermission,
};
