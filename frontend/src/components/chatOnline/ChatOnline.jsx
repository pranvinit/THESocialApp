import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, userId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const getFriends = async (id) => {
    try {
      const res = await axios.get(`/users/${id}/friends`);
      setFriends(res.data.followings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends(userId);
  }, [userId]);

  useEffect(() => {
    const data = friends.filter((f) => onlineUsers.includes(f._id));
    setOnlineFriends(data);
  }, [friends, onlineUsers]);

  const handleClick = async (friendId) => {
    try {
      const res = await axios.get(`/conversations/getOrCreate/${friendId}`);
      setCurrentChat(res.data.conversation);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div children="chatOnline">
      {onlineFriends.map((o) => (
        <div
          key={o._id}
          className="chatOnlineFriend"
          onClick={() => handleClick(o._id)}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                o?.profilePicture
                  ? o.profilePicture
                  : "/assets/person/noAvatar.png"
              }
              alt="chat"
              className="chatOnlineImg"
            />
            <span className="chatOnlineBadge"></span>
          </div>
          <span className="chatOnlineText">{o.username}</span>
        </div>
      ))}
    </div>
  );
}
