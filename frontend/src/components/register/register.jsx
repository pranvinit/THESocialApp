import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";

// auth services imports
import { registerRequest } from "../../context/AuthService";

export default function Register() {
  const navigate = useNavigate();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confPassword = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.current.value !== confPassword.current.value) {
      console.log(confPassword.current.value);
      confPassword.current.setCustomValidity("Passwords don't match");
      return;
    }
    try {
      await registerRequest({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <span className="registerLogo">THESocialApp</span>
          <span className="registerDesc">
            Connect with friends and the world around you on THESocialApp.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleRegister}>
            <input
              type="text"
              className="registerInput"
              placeholder="Username"
              ref={username}
            />
            <input
              type="email"
              className="registerInput"
              placeholder="Email"
              ref={email}
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Password"
              ref={password}
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Confirm Password"
              ref={confPassword}
            />
            <button className="registerButton">Register</button>
            <button
              className="registerLoginButton"
              onClick={() => navigate("/login")}
            >
              Log In to your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
