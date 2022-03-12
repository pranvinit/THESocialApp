import "./leftbar.css";

// mui-icons imports
import { RssFeed } from "@mui/icons-material";

export default function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="feedIcon" />
          </li>
          <li className="sidebarListItem"></li>
          <li className="sidebarListItem"></li>
        </ul>
      </div>
    </div>
  );
}
