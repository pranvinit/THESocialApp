import "./resetPassword.css";
import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const passwordToken = searchParams.get("passwordToken");
  const email = searchParams.get("email");

  const newPassword = useRef();
  const [passwordResetStatus, setPasswordResetStatus] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = async () => {
    if (!newPassword.current.value) return;
    try {
      await axios.post("/auth/reset-password", {
        passwordToken,
        email,
        password: newPassword.current.value,
      });
      setPasswordResetStatus(true);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  if (passwordResetStatus || error) {
    return (
      <div className="resetContainer">
        <div className="resetBox">
          <span className="resetText">
            {error ? error.msg : "Password was changed successfully"}
          </span>
          {!error ? (
            <Link to="/login" className="no-dec">
              <button className="resetPasswordLoginButton">Login</button>
            </Link>
          ) : (
            <Link to="/register" className="no-dec">
              <button className="resetPasswordRegisterButton">Register</button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="resetPassword">
      <div className="resetPasswordBox">
        <span className="resetPasswordText">Enter new password</span>
        <input
          type="password"
          placeholder="New Password"
          ref={newPassword}
          className="resetPasswordInput"
        />
        <button className="resetPasswordButton" onClick={handleReset}>
          Reset Password
        </button>
      </div>
    </div>
  );
}
