import "./closeFriend.css";
export default function CloseFriend({ user }) {
  return (
    <li className="sidebarFriend">
      <img
        src={`/assets/${user.profilePicture}`}
        alt="friend"
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName"> {user.username} </span>
    </li>
  );
}
