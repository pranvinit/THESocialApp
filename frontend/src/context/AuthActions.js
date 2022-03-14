export const AuthorizeUser = (user) => ({
  type: "AUTHORIZE_USER",
  payload: user,
});

export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
  payload: userCredentials,
});
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginError = (err) => ({
  type: "LOGIN_ERROR",
  payload: err,
});

export const Logout = () => ({
  type: "LOGOUT",
});
