import "./profile.css";

// components imports
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  // created the new profileRightTop design for the profile page
  return (
    <>
      <Topbar />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/post/3.jpeg"
                alt="cover"
                className="profileCoverImg"
              />
              <img
                src="/assets/person/5.jpeg"
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
