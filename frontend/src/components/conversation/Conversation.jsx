import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const friendId = conversation.members.find((c) => c !== currentUser._id);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`/users/${friendId}`);
        setUser(user.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? user.profilePicture
            : "/assets/person/noAvatar.png"
        }
        alt="conversation"
        className="conversationImg"
      />
      <span className="conversationText">{user?.username}</span>
    </div>
  );
}
