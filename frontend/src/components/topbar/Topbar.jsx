import "./topbar.css";

// mui-icons imports
import { Chat, Notifications, Person, Search } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">THESocialApp</span>
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
        <img src="/assets/person/1.jpeg" alt="profile" className="topbarImg" />
      </div>
    </div>
  );
}
