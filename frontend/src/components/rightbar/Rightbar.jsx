import "./rightbar.css";

// components imports
import Online from "../online/Online";

// dummy data imports
import { Users } from "../../dummyData";

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="gift" className="giftImg" />
          <span className="birthdayText">
            <b>Jane Parker</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <div className="rightbarAdsContainer">
          <img src="/assets/ad.png" alt="ad" className="rightbarAd" />
        </div>
        <span className="rightbarTitle">Online Friends</span>
        <ul className="onlineFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
