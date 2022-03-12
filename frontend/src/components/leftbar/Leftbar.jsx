import "./leftbar.css";

// mui-icons imports
import {
  PlayCircleFilledOutlined,
  Chat,
  RssFeed,
  Groups,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";

export default function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarItemLabel">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarItemLabel">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarItemLabel">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Groups className="sidebarIcon" />
            <span className="sidebarItemLabel">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarItemLabel">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarItemLabel">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarItemLabel">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarItemLabel">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarItemLabel">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
          <li className="sidebarFriend">
            <img
              src="/assets/person/4.jpeg"
              alt="friend"
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">John smilga</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
