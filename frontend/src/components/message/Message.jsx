import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own, user }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={
            own && user.profilePicture
              ? user.profilePicture
              : "/assets/person/noAvatar.png"
          }
          alt="message"
          className="messageImg"
        />
        <span className="messageText">{message.text}</span>
      </div>
      <div className="messageBottom">
        <span>{format(message.createdAt)}</span>
      </div>
    </div>
  );
}
