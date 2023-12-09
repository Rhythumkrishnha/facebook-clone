import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "axios";

const user = JSON.parse(sessionStorage.getItem("user"));

export default function Rightbar({ profile }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    try {
      const getFriends = async () => {
        let response;
        if (profile) {
          response = await axios.get(`/friend/${profile.id}`);
        } else {
          response = await axios.get(`/friend/${user.id}`);
        }

        if (response.status === 200) {
          setFriends(response.data.friends);
        }
      };

      getFriends();
    } catch (error) {
      throw error;
    }
  }, [friends]);

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Username:</span>
            <span className="rightbarInfoValue">{profile.username}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Email:</span>
            <span className="rightbarInfoValue">{profile.email}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Contact:</span>
            <span className="rightbarInfoValue">{profile.contact}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Bio:</span>
            <span className="rightbarInfoValue">{profile.bio}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="rightbarFollowing">
              <img
                src={friend.profile_photo}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.name}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
