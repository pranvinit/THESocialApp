import "./online.css";

export default function Online({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="profileImgContainer">
        <img
          src={
            user.profilePicture
              ? user.profilePicture
              : "/assets/person/noAvatar.png"
          }
          alt="profile"
          className="profileImg"
        />
        <span className="rightbarOnlineBadge"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
