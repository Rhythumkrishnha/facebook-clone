import { Link } from "react-router-dom";
import "./topbar.css";
import { Chat, Notifications, Person } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sessionData = window.sessionStorage.getItem("user");
const sessionUser = JSON.parse(sessionData);

export default function Topbar() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState(["Johnson"]);
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState(false);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

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

  // get all facebook users
  useEffect(() => {
    try {
      const getAllUsers = async () => {
        const response = await axios.get("/users");
        const allUsers = response.data.users;
        setUsers(allUsers.map((user) => ({ name: user.name, value: user.id })));
        setUsers(users.filter((user) => user.name !== sessionUser.name));
      };
      getAllUsers();
    } catch (error) {
      throw error;
    }
  }, [users]);

  // get friend requests
  useEffect(() => {
    try {
      const getRequests = async () => {
        const response = await axios.get(`/friend/requests/${user.id}`);

        if (response) {
          setRequests(response.data.requests);
        } else {
          setRequests([]);
        }
      };
      getRequests();
    } catch (error) {
      throw error;
    }
  }, [requests]);

  const handleInputChange = (event, value) => {
    if (value === "") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleEvent = (event, newValue) => {
    setOpen(false);
    navigate(`/profile/${newValue.value}`);
  };

  const handleConfirmRequest = async (follower_id) => {
    try {
      const data = {
        follower_id,
        following_id: user.id,
      };
      await axios.put("/friend", data);
    } catch (error) {
      throw error;
    }
  };

  const handleRejectRequest = async (follower_id) => {
    try {
      const response = await axios.delete(`/friend/${follower_id}`);
      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Facebook</span>
      </div>
      <div className="topbarCenter">
        <Autocomplete
          className="searchbar"
          options={users}
          getOptionLabel={(option) => option.name}
          noOptionsText={"No user found"}
          open={open}
          onInputChange={handleInputChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0",
              padding: "0",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                variant="outlined"
                sx={{ border: 0 }}
                size="small"
                placeholder="Search for friends"
                className="searchInput"
              ></TextField>
            );
          }}
          size="small"
          onChange={handleEvent}
        ></Autocomplete>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem" onClick={() => setPerson(!person)}>
            <Person />
            <span className="topbarIconBadge">{requests.length}</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div
            className={`${
              person ? `topbarFriend topbarFriendBox` : `topbarFriend`
            }`}
          >
            <span className="topbarFriendTitle">Friend requests</span>
            {requests.length !== 0
              ? requests.map((request) => (
                  <div className="topbarFriendRequest" key={request.id}>
                    {console.log(request)}
                    <div className="topbarFriendInfo">
                      <img
                        src={request.profile_photo}
                        alt=""
                        className="topbarFriendPhoto"
                      ></img>
                      <div className="topbarFriendName">{request.name}</div>
                    </div>
                    <div className="topbarFriendButton">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleConfirmRequest(request.id)}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              : "No requests found"}
          </div>
        </div>
        <Link to={`/profile/${user.id}`}>
          <img src={user.profile_photo} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
