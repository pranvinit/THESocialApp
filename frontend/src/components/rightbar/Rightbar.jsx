import "./rightbar.css";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

// components imports
import Online from "../online/Online";

// auth context imports
import { AuthContext } from "../../context/AuthContext";

const RELATIONSHIP_STATUS = {
  1: "Single",
  2: "Married",
};

const HomeRightBar = () => {
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
      <span className="rightbarTitle">Online Users</span>
      <ul className="onlineFriendList">
        {users.map((u) => (
          <Online key={u._id} user={u} />
        ))}
      </ul>
    </>
  );
};

const ProfileRightBar = ({ user, loading }) => {
  const { user: currentUser } = useContext(AuthContext);

  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    setIsFollowed(followers.includes(currentUser._id));
  }, [followers, currentUser]);

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      if (!isFollowed) {
        await axios.get(`/users/${user._id}/follow`);
      } else {
        await axios.get(`/users/${user._id}/unfollow`);
      }
      setFollowLoading(false);
      setIsFollowed(!isFollowed);
    } catch (err) {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    if (!user._id || loading) return;
    const getFriends = async () => {
      try {
        const res = await axios.get(`/users/${user._id}/friends`);
        setFollowings(res.data.followings);
        console.log(res.data);
        setFollowers(res.data.followers.map((f) => f._id));
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, loading]);

  if (loading) {
    return (
      <div className="rightbarInfoLoading">
        <CircularProgress />
      </div>
    );
  }

  const followLabel = !isFollowed ? "follow" : "unfollow";
  const followIcon = !isFollowed ? <Add /> : <Remove />;
  const followText = (
    <>
      {followIcon}
      {followLabel}
    </>
  );

  return (
    <>
      {currentUser._id !== user._id && (
        <button className="rightbarFollowButton" onClick={handleFollow}>
          {followLoading && (
            <CircularProgress className="followLoading" size={20} />
          )}
          {!followLoading && followText}
        </button>
      )}
      <span className="rightbarProfileTitle">User information</span>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City: </span>
          <span className="rightbarInfoValue">
            {user.city ? user.city : "Not Set"}
          </span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From: </span>
          <span className="rightbarInfoValue">
            {user.from ? user.from : "Not Set"}
          </span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship: </span>
          <span className="rightbarInfoValue">
            {user.relationship
              ? RELATIONSHIP_STATUS[user.relationship]
              : "Not Set"}
          </span>
        </div>
        <span className="rightbarProfileTitle rightbarprofileFriendsTitle">
          User friends
        </span>
        <div className="rightbarFollowings">
          {followings.map((f) => (
            <Link key={f._id} to={`/profile/${f._id}`} className="no-dec">
              <div className="rightbarFollowing">
                <img
                  src={
                    f.profilePicture
                      ? f.profilePicture
                      : "/assets/person/noAvatar.png"
                  }
                  alt="following"
                  className="rightbarFollowingImg"
                />
                <span className="rightbarUsername">{f.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default function Rightbar({ home, user, loading }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {home ? (
          <HomeRightBar />
        ) : (
          <ProfileRightBar user={user} loading={loading} />
        )}
      </div>
    </div>
  );
}
