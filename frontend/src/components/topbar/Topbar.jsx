import "./topbar.css";
import { useContext } from "react";
// mui-icons imports
import { Chat, Notifications, Person, Search } from "@mui/icons-material";

// react-router imports
import { Link } from "react-router-dom";

// auth context
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="no-dec">
          <span className="logo">THESocialApp</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchbarIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Hompage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIcon">
            <Person />
            <span className="topbarIconsBadge">1</span>
          </div>
          <div className="topbarIcon">
            <Chat />
            <span className="topbarIconsBadge">2</span>
          </div>
          <div className="topbarIcon">
            <Notifications />
            <span className="topbarIconsBadge">1</span>
          </div>
        </div>
        <Link classname="no-dec" to="/profile">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/person/noAvatar.png"
            }
            alt="profile"
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
