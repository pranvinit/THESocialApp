import "./login.css";

export default function Login() {
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
            />
            <input
              type="password"
              name="password"
              className="loginInput"
              placeholder="Password"
            />
            <button className="loginButton">Log In</button>
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
