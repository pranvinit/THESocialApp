// action creators import
import {
  LoginStart,
  LoginSuccess,
  LoginError,
  AuthorizationStart,
  AuthorizationSuccess,
  AuthorizationError,
} from "./AuthActions";

import axios from "axios";

export const getCurrentUser = async (dispatch) => {
  dispatch(AuthorizationStart());
  try {
    const user = await axios.get("/users/showUser");
    dispatch(AuthorizationSuccess(user.data.user));
  } catch (err) {
    dispatch(AuthorizationError(err));
  }
};

export const loginRequest = async ({ email, password, dispatch }) => {
  dispatch(LoginStart());
  try {
    const user = await axios.post("/auth/login", { email, password });
    dispatch(LoginSuccess(user.data));
  } catch (err) {
    dispatch(LoginError(err));
  }
};

export const registerRequest = async (body) => {
  return axios.post("/auth/register", body);
};
