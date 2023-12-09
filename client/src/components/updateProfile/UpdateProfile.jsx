import { Button, FormLabel, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import "./updateProfile.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const user = JSON.parse(sessionStorage.getItem("user"));

export default function UpdateProfile({ open, setOpen }) {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    email: "",
    contact: 1,
    cover_photo: "",
    profile_photo: "",
  });
  const [error, setError] = useState({
    status: false,
    errorMessage: "",
  });

  useEffect(() => {
    if (open.profileOpen || open.postOpen)
      document.body.style.overflow = "hidden";
    else  
      document.body.style.overflow = "scroll";
  });

  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const response = await axios.get(`/profile/${user.id}`);
        const profile = response.data.profile;
        setProfile({
          ...profile,
          name: profile.name,
          email: profile.email,
          contact: parseInt(profile.contact),
          bio: profile.bio,
        });
      };
      getUserProfile();
    } catch (error) {
      throw error;
    }
  }, []);

  const handleEvent = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "profile_photo" || name === "cover_photo") {
      value = e.target.files[0];
    }

    setProfile({ ...profile, [name]: value });
    console.log(profile);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("contact", profile.contact);
    formData.append("bio", profile.bio);
    formData.append("profile_photo", profile.profile_photo);
    formData.append("cover_photo", profile.cover_photo);

    try {
      const data = await axios.put(`/profile/${user.id}`, formData, {
        "Content-Type": "multipart/form-data",
      });
      if (data) {
        setOpen({ ...open, profileOpen: false });
      } else {
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="update">
      <div className="updateWrapper">
        <div className="updateRight">
          <div className="updateBox">
            <div className="updateBoxField">
              <div className="formLabel">
                <FormLabel
                  style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Name
                </FormLabel>
              </div>
              <div className="updateInput">
                <TextField
                  style={{ minWidth: "300px", maxWidth: "300px" }}
                  variant="outlined"
                  className="updateInput"
                  size="small"
                  name="name"
                  value={profile.name}
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div className="updateBoxField">
              <div className="formLabel">
                <FormLabel style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  Email
                </FormLabel>
              </div>
              <div className="updateInput">
                <TextField
                  style={{ minWidth: "300px", maxWidth: "300px" }}
                  variant="outlined"
                  className="updateInput"
                  size="small"
                  name="email"
                  value={profile.email}
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div className="updateBoxField">
              <div className="formLabel">
                <FormLabel style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  Contact
                </FormLabel>
              </div>
              <div className="updateInput">
                <TextField
                  style={{ minWidth: "300px", maxWidth: "300px" }}
                  variant="outlined"
                  className="updateInput"
                  size="small"
                  name="contact"
                  value={profile.contact}
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div className="updateBoxField">
              <div className="formLabel">
                <FormLabel style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  Description
                </FormLabel>
              </div>
              <div className="updateInput">
                <TextField
                  style={{ minWidth: "300px", maxWidth: "300px" }}
                  variant="outlined"
                  className="updateInput"
                  size="small"
                  name="bio"
                  value={profile.bio}
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div className="updateBoxField">
              <div className="formLabel">
                <FormLabel style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  Cover Photo
                </FormLabel>
              </div>
              <div className="updateInput">
                <TextField
                  style={{ minWidth: "300px", maxWidth: "300px" }}
                  variant="outlined"
                  className="updateInput"
                  size="small"
                  name="cover_photo"
                  type="file"
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div className="updateBoxField">
              <div className="formLabel">
                <FormLabel style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  Profile Photo
                </FormLabel>
              </div>
              <div className="updateInput">
                <TextField
                  style={{ minWidth: "300px", maxWidth: "300px" }}
                  variant="outlined"
                  className="updateInput"
                  size="small"
                  name="profile_photo"
                  type="file"
                  onChange={handleEvent}
                />
              </div>
            </div>
            <div className="updateBottom">
              <p className="errorMessage">
                {error.status ? `${error.errorMessage}` : ""}
              </p>
              <Button variant="contained" size="small" onClick={handleUpdate}>
                Update Profile
              </Button>
            </div>
          </div>
          <div
            className="updateCloseButton"
            onClick={() => setOpen({ ...open, profileOpen: false })}
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
