import "./leftbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";

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

// components imports
import User from "../user/User";

// auth context imports
import { AuthContext } from "../../context/AuthContext";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Leftbar() {
  const [users, setUsers] = useState([]);

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/users");
        setUsers(res.data.users.filter((u) => u._id !== currentUser._id));
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

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
          {users.map((u) => (
            <Link key={u._id} to={`/profile/${u._id}`} className="no-dec">
              <User user={u} />
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
