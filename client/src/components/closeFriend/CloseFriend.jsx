import "./closeFriend.css";

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
      <img src={user.profile_photo} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.name}</span>
    </li>
  );
}
