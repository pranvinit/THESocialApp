import "./rightbar.css";
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
          <li className="rightbarFriend">
            <div className="profileImgContainer">
              <img
                src="/assets/person/7.jpeg"
                alt="profile"
                className="profileImg"
              />
              <span className="rightbarOnlineBadge"></span>
            </div>
            <span className="rightbarUsername">John smilga</span>
          </li>
          <li className="rightbarFriend">
            <div className="profileImgContainer">
              <img
                src="/assets/person/7.jpeg"
                alt="profile"
                className="profileImg"
              />
              <span className="rightbarOnlineBadge"></span>
            </div>
            <span className="rightbarUsername">John smilga</span>
          </li>
          <li className="rightbarFriend">
            <div className="profileImgContainer">
              <img
                src="/assets/person/7.jpeg"
                alt="profile"
                className="profileImg"
              />
              <span className="rightbarOnlineBadge"></span>
            </div>
            <span className="rightbarUsername">John smilga</span>
          </li>
          <li className="rightbarFriend">
            <div className="profileImgContainer">
              <img
                src="/assets/person/7.jpeg"
                alt="profile"
                className="profileImg"
              />
              <span className="rightbarOnlineBadge"></span>
            </div>
            <span className="rightbarUsername">John smilga</span>
          </li>
          <li className="rightbarFriend">
            <div className="profileImgContainer">
              <img
                src="/assets/person/7.jpeg"
                alt="profile"
                className="profileImg"
              />
              <span className="rightbarOnlineBadge"></span>
            </div>
            <span className="rightbarUsername">John smilga</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
