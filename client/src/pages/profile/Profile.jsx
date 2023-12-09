import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProfile from "../../components/updateProfile/UpdateProfile";
import CreatePost from "../../components/createPost/CreatePost";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";

const user = JSON.parse(sessionStorage.getItem("user"));

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState({
    profileOpen: false,
    postOpen: false,
  });
  const { user_id } = useParams();
  const [request, setRequest] = useState({
    message: "Add friend",
    status: false,
  });

  const updateProfileStyle = {
    display: open.profileOpen ? "block" : "none",
    position: "absolute",
    top: "0px",
    width: "100%",
  };

  const createPostStyle = {
    display: open.postOpen ? "block" : "none",
    position: "absolute",
    top: "0px",
    width: "100%",
  };

  // to fetch user profile
  useEffect(() => {
    try {
      const fetchProfile = async () => {
        if (user_id) {
          const response = await axios.get(`/profile/${user_id}`);
          setProfile(response.data.profile);
        }
      };
      fetchProfile();
    } catch (error) {
      throw error;
    }
  }, [profile]);

  // to check friend request status
  useEffect(() => {
    try {
      const checkFriend = async () => {
        const response = await axios.get(`/friend/status/${profile.id}`);
        if (response.status === 200) {
          if (response.data.request.status) {
            setRequest({ ...request, status: true, message: "Friend" });
          } else {
            setRequest({ ...request, message: "Request sent" });
          }
        } else {
          setRequest({ ...request, status: false, message: "Add friend" });
        }
      };
      checkFriend();
    } catch (error) {
      throw error;
    }
  });

  const handleFriendRequest = async () => {
    const data = {
      follower_id: user.id,
      following_id: profile.id,
    };
    const response = await axios.post("/friend", data);
    if (response.status === 201) {
      setRequest({ ...request, message: response.data.message });
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={profile.cover_photo}
                alt=""
              />
              <img
                className="profileUserImg"
                src={profile.profile_photo}
                alt=""
              />
              <div className="profileInfo">
                <div className="profileInfoDetails">
                  <h4 className="profileInfoName">{profile.name}</h4>
                  <span className="profileInfoDesc">
                    911 friends • 345 following
                  </span>
                </div>
                <div className="profileInfoButton">
                  {user.id === profile.id ? (
                    <>
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => setOpen({ ...open, profileOpen: true })}
                        size="small"
                      >
                        Edit profile
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => setOpen({ ...open, postOpen: true })}
                      >
                        Create post
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        startIcon={
                          request.status ? <PersonIcon /> : <PersonAddIcon />
                        }
                        onClick={handleFriendRequest}
                        size="small"
                      >
                        {request.message}
                      </Button>
                      <Button
                        startIcon={<ChatIcon />}
                        variant="text"
                        size="small"
                      >
                        Message
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={profile.id} />
            <Rightbar profile={profile} />
          </div>
          <div className="updateProfile" style={updateProfileStyle}>
            <UpdateProfile open={open} setOpen={setOpen} />
          </div>
          <div className="createPost" style={createPostStyle}>
            <CreatePost open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </>
  );
}
