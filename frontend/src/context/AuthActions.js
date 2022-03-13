export const AuthorizationStart = (userCredentials) => ({
  type: "AUTHORIZATION_START",
  payload: userCredentials,
});
export const AuthorizationSuccess = (user) => ({
  type: "AUTHORIZATION_SUCCESS",
  payload: user,
});
export const AuthorizationError = (err) => ({
  type: "AUTHORIZATION_ERROR",
  payload: err,
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
