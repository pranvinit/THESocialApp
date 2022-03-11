const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attackCookieToResponse = ({ res, user }) => {
  const token = createJWT(user);
  const duration = 1000 * 60 * 60 * 24 * 2;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + duration),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  verifyJWT,
  attackCookieToResponse,
};
