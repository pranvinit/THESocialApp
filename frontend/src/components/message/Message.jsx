import "./message.css";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="/assets/person/noAvatar.png"
          alt="message"
          className="messageImg"
        />
        <span className="messageText">Hello this is the message</span>
      </div>
      <div className="messageBottom">
        <span>1 hour ago</span>
      </div>
    </div>
  );
}
