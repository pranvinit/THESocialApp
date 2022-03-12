import "./rightbar.css";

// components imports
import Online from "../online/Online";

// dummy data imports
import { Users } from "../../dummyData";

const HomeRightBar = () => {
  return (
    <>
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
    </>
  );
};

const ProfileRightBar = () => {
  return (
    <>
      <span className="rightbarProfileTitle">User information</span>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City: </span>
          <span className="rightbarInfoValue">Pune</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From: </span>
          <span className="rightbarInfoValue">Jalgoan</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship: </span>
          <span className="rightbarInfoValue">Single</span>
        </div>
        <span className="rightbarProfileTitle rightbarprofileFriendsTitle">
          User friends
        </span>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="/assets/person/4.jpeg"
              alt="following"
              className="rightbarFollowingImg"
            />
            <span className="rightbarUsername">John smilga</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/3.jpeg"
              alt="following"
              className="rightbarFollowingImg"
            />
            <span className="rightbarUsername">John smilga</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/7.jpeg"
              alt="following"
              className="rightbarFollowingImg"
            />
            <span className="rightbarUsername">John smilga</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/8.jpeg"
              alt="following"
              className="rightbarFollowingImg"
            />
            <span className="rightbarUsername">John smilga</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Rightbar({ home }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {home ? <HomeRightBar /> : <ProfileRightBar />}
      </div>
    </div>
  );
}
