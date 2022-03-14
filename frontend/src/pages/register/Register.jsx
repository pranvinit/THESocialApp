import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { useRef, useState, useContext } from "react";
// auth context imports
import { AuthContext } from "../../context/AuthContext";

// components imports
import Verify from "../../components/verify/Verify";

export default function Register() {
  const navigate = useNavigate();

  const { registerRequest } = useContext(AuthContext);

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confPassword = useRef();
  const from = useRef();
  const city = useRef();
  const relationship = useRef();

  const [profileImgFile, setProfileImgFile] = useState(null);
  const [coverImgFile, setCoverImgFile] = useState(null);

  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);

  const [loading, setLoading] = useState(false);

  // handling verify email
  const [registerUser, setRegisterUser] = useState(null);

  const handleProfileFileChange = ({ target }) => {
    setProfileImgFile(target.files[0]);
    setProfileImg(URL.createObjectURL(target.files[0]));
  };

  const handleCoverFileChange = ({ target }) => {
    setCoverImgFile(target.files[0]);
    setCoverImg(URL.createObjectURL(target.files[0]));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.current.value !== confPassword.current.value) {
      confPassword.current.setCustomValidity("Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      const body = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        from: from.current.value,
        city: city.current.value,
        relationship: relationship.current.value,
      };

      // handling profile image upload
      if (profileImgFile) {
        const data = new FormData();
        data.append("image", profileImgFile);
        const imgUrl = await axios.post("/uploads", data);
        body.profilePicture = imgUrl.data.image;
      }
      if (coverImgFile) {
        const data = new FormData();
        data.append("image", coverImgFile);
        const imgUrl = await axios.post("/uploads", data);
        body.coverPicture = imgUrl.data.image;
      }

      const res = await registerRequest(body);
      localStorage.removeItem("user");
      setRegisterUser(res.data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (registerUser) {
    return (
      <Verify
        title="Verify your email to log in"
        hint="Hint: click on the link provided in email to verify your account"
        linkText="verify Email"
      />
    );
  }

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
            <label htmlFor="coverImg" className="registerCoverLabel">
              <img
                src={!coverImg ? "/assets/person/noCover.png" : coverImg}
                alt="cover"
                className="registerCoverImg"
              />
              <input
                type="file"
                id="coverImg"
                className="hidden"
                onChange={handleCoverFileChange}
              />
              <label htmlFor="profileImg" className="registerProfileLabel">
                <img
                  src={!profileImg ? "/assets/person/noAvatar.png" : profileImg}
                  alt="profile"
                  className="registerProfileImg"
                />
                <input
                  type="file"
                  id="profileImg"
                  className="hidden"
                  onChange={handleProfileFileChange}
                />
              </label>
            </label>
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
            <input className="registerInput" placeholder="From" ref={from} />
            <input className="registerInput" placeholder="City" ref={city} />
            <input
              list="relationship"
              className="registerInput"
              placeholder="Relationship"
              ref={relationship}
            />
            <datalist id="relationship" ref={relationship}>
              <option value="1">Single</option>
              <option value="2">Married</option>
            </datalist>
            <button className="registerButton" disabled={loading}>
              {!loading ? (
                "Register"
              ) : (
                <CircularProgress size={24} className="loadingIndicator" />
              )}
            </button>
            <span
              className="registerLoginText"
              onClick={() => navigate("/login")}
            >
              Log In to your account
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
