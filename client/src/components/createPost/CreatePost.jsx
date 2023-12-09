import { Button, FormLabel, TextField } from "@mui/material";
import { useState } from "react";
import "./createPost.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

// const user = JSON.parse(sessionStorage.getItem("user"));

export default function CreatePost({ open, setOpen }) {
  const [post, setPost] = useState({
    content: "",
    image: "",
  });
  const [error, setError] = useState({
    status: false,
    errorMessage: "",
  });

  const handleEvent = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "image") {
      value = e.target.files[0];
    }

    setPost({ ...post, [name]: value });
    console.log(post);
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", post.content);
      formData.append("image", post.image);
      const data = await axios.post("/post", formData, {
        "Content-Type": "multipart/form-data",
      });
      if (data) {
        setOpen({ ...open, postOpen: false });
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="createPost">
      <div className="createPostWrapper">
        <div className="createPostRight">
          <div className="createPostBox">
            <div className="createPostBoxField">
              <FormLabel
                style={{
                  flex: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Content
              </FormLabel>
              <TextField
                style={{ flex: "3", width: "60%" }}
                variant="outlined"
                className="postInput"
                size="small"
                name="content"
                value={post.content}
                onChange={handleEvent}
              />
            </div>
            <div className="createPostBoxField">
              <FormLabel
                style={{
                  flex: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Image
              </FormLabel>
              <TextField
                style={{ flex: "3", width: "60%" }}
                variant="outlined"
                className="postInput"
                size="small"
                name="image"
                type="file"
                onChange={handleEvent}
              />
            </div>
            <div className="createPostBottom">
              <p className="errorMessage">
                {error.status ? `${error.errorMessage}` : ""}
              </p>
              <Button
                style={{ width: "60%" }}
                variant="contained"
                size="small"
                onClick={handlePost}
              >
                Create post
              </Button>
            </div>
          </div>
          <div
            className="createPostCloseButton"
            onClick={() => setOpen({ ...open, postOpen: false })}
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
