import { useReducer, createContext } from "react";
import axios from "axios";

// action creators import
import {
  AuthorizeUser,
  LoginStart,
  LoginSuccess,
  LoginError,
  Logout,
} from "./AuthActions";

// reducer function import
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: localStorage.getItem("user") || null,
  isFetching: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

// auth services imports

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const authorizeUser = async () => {
    try {
      const user = await axios.get("/users/showUser");
      dispatch(AuthorizeUser(user.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  const loginRequest = async ({ email, password }) => {
    dispatch(LoginStart());
    try {
      const res = await axios.post("/auth/login", { email, password });
      dispatch(LoginSuccess(res.data.user));
      localStorage.setItem("user", res.data.user);
    } catch (err) {
      dispatch(LoginError(err));
    }
  };

  const registerRequest = async (body) => {
    return axios.post("/auth/register", body);
  };

  const logoutRequest = async () => {
    await axios.get("/auth/logout");
    dispatch(Logout());
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        authorizeUser,
        loginRequest,
        registerRequest,
        logoutRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
