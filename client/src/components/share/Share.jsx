import { useEffect, useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import axios from "axios";

const sessionData = sessionStorage.getItem("user");
const sessionUser = JSON.parse(sessionData);

export default function Share() {
  const [user, setUser] = useState("");

  // get session user information
  useEffect(() => {
    try {
      const getUser = async () => {
        const response = await axios.get(`/users/${sessionUser.id}`);

        if (response.status === 200) {
          setUser(response.data.user);
        }
      };
      getUser();
    } catch (error) {
      throw error;
    }
  });

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profile_photo} alt="" />
          <input
            placeholder={`What's in your mind ${user.name}?`}
            type="text"
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}
