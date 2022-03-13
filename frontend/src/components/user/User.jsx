import "./user.css";
export default function User({ user }) {
  return (
    <li className="sidebarFriend">
      <img
        src={
          user.profilePicture
            ? user.profilePicture
            : "/assets/person/noAvatar.png"
        }
        alt="friend"
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName"> {user.username} </span>
    </li>
  );
}
