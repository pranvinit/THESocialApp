import "./register.css";

export default function Register() {
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
          <div className="registerBox">
            <input
              type="email"
              name="email"
              className="registerInput"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              className="registerInput"
              placeholder="Password"
            />
            <input
              type="password"
              name="confPassword"
              className="registerInput"
              placeholder="Confirm Password"
            />
            <button className="registerButton">Register</button>
            <button className="registerLoginButton">
              Log In to your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
