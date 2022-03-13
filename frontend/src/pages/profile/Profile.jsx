import "./profile.css";
import { useContext } from "react";

// components imports
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

// auth context imports
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  // created the new profileRightTop design for the profile page

  const { user } = useContext(AuthContext);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : "/assets/person/noCover.png"
                }
                alt="cover"
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "/assets/person/noAvatar.png"
                }
                alt="profile"
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <span className="profileName">John smilga</span>
              <span className="profileDesc">Hey all, how's it going</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}
