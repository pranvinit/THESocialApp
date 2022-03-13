import "./login.css";
import { useRef, useContext } from "react";

// context imports
import { AuthContext } from "../../context/AuthContext";

// auth services imports
import { loginRequest } from "../../context/AuthService";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = () => {
    if (email.current.value && password.current.value) {
      loginRequest({
        email: email.current.value,
        password: password.current.value,
        dispatch,
      });
    }
  };

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
          <div className="loginBox">
            <input
              type="email"
              name="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
            />
            <input
              type="password"
              name="password"
              className="loginInput"
              placeholder="Password"
              ref={password}
            />
            <button className="loginButton" onClick={handleSubmit}>
              Log In
            </button>
            <span className="forgotPassword">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
