import "./chatOnline.css";

export default function ChatOnline() {
  return (
    <div children="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src="/assets/person/noAvatar.png"
            alt="chat"
            className="chatOnlineImg"
          />
          <span className="chatOnlineBadge"></span>
        </div>
        <span className="chatOnlineText">John smilga</span>
      </div>
    </div>
  );
}
