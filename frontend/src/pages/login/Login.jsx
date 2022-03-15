import "./login.css";
import { useRef, useContext, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";

// context imports
import { AuthContext } from "../../context/AuthContext";
import Verify from "../../components/verify/Verify";

export default function Login() {
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();

  const forgotPasswordEmail = useRef();

  const [loading, setLoading] = useState(false);
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const { isFetching, loginRequest, forgotPasswordRequest, error } =
    useContext(AuthContext);

  const handleSubmit = () => {
    if (email.current.value && password.current.value) {
      loginRequest({
        email: email.current.value,
        password: password.current.value,
      });
    }
  };

  const handleForgot = async () => {
    setLoading(true);
    try {
      await forgotPasswordRequest(forgotPasswordEmail.current.value);
      setForgotPasswordStatus(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (forgotPasswordStatus) {
    return (
      <Verify
        title="Check email to reset password"
        hint="Hint: click on the link provided in email to reset your password"
        linkText="Go To Email"
      />
    );
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <span className="loginLogo">THESocialApp</span>
          <span className="loginDesc">
            Connect with friends and the world around you on THESocialApp.
          </span>
        </div>
        <div className="loginRight">
          {error && (
            <Alert severity="error" className="loginAlert">
              {error.msg}
            </Alert>
          )}
          {forgotPassword ? (
            <div className="forgotPasswordBox">
              <span className="forgotPasswordText">
                Enter email to receive password reset link
              </span>
              <input
                type="email"
                className="loginInput"
                placeholder="Email"
                ref={forgotPasswordEmail}
              />
              <button className="forgotPasswordButton" onClick={handleForgot}>
                {!loading ? (
                  "Send Link"
                ) : (
                  <CircularProgress size={24} className="loadingIndicator" />
                )}
              </button>
              <span
                className="forgotBackText"
                onClick={() => setForgotPassword(false)}
              >
                Back
              </span>
            </div>
          ) : (
            <div className="loginBox">
              <input
                type="email"
                className="loginInput"
                placeholder="Email"
                ref={email}
              />
              <input
                type="password"
                className="loginInput"
                placeholder="Password"
                ref={password}
              />
              <button className="loginButton" onClick={handleSubmit}>
                {!isFetching ? (
                  "Log In"
                ) : (
                  <CircularProgress size={24} className="loadingIndicator" />
                )}
              </button>
              <span
                className="forgotPassword"
                onClick={() => setForgotPassword(true)}
              >
                Forgot Password?
              </span>
              <span
                className="loginRegisterText"
                onClick={() => navigate("/register")}
              >
                Create a New Account
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
