import axios from "axios";
import "./register.css";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [options, setOptions] = useState({
    visibility: false,
    status: "",
    error: false,
    errorMessage: "",
  });

  const handleEvent = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    if (user.password !== user.confirmPassword) {
      setOptions({
        ...options,
        error: true,
        errorMessage: "Password mismatch",
      });
      return;
    } else {
      setOptions({ ...options, error: true, errorMessage: "" });
    }
    const response = await axios.post("/auth/register", user);
    const message = response.data.message;

    if (message === "Username already exist") {
      return setOptions({
        ...options,
        error: true,
        errorMessage: `${message}`,
      });
    } else {
      setOptions({ ...options, status: "Successful" });
    }

    console.log(response.data);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDescription">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <div className="registerBox">
            <TextField
              style={{ maxWidth: "90%", minWidth: "90%" }}
              className="loginInput"
              label="Name"
              variant="outlined"
              name="name"
              onChange={handleEvent}
              size="small"
            />
            <TextField
              style={{ maxWidth: "90%", minWidth: "90%" }}
              className="loginInput"
              label="Username"
              variant="outlined"
              name="username"
              onChange={handleEvent}
              size="small"
            />
            <TextField
              style={{ maxWidth: "90%", minWidth: "90%" }}
              className="loginInput"
              label="Password"
              type={options.visibility ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <VisibilityIcon
                    onClick={() =>
                      setOptions({
                        ...options,
                        visibility: !options.visibility,
                      })
                    }
                    className="visibilityIcon"
                  />
                ),
              }}
              name="password"
              onChange={handleEvent}
              size="small"
            />
            <TextField
              style={{ maxWidth: "90%", minWidth: "90%" }}
              label="Confirm password"
              variant="outlined"
              className="loginInput"
              size="small"
              type="password"
              name="confirmPassword"
              onChange={handleEvent}
            />
            <p className="errorMessage">
              {options.error ? `${options.errorMessage}` : ""}
            </p>
            <Button
              style={{ maxWidth: "80%", minWidth: "80%" }}
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              Register
            </Button>
            <Button
              style={{ maxWidth: "80%", minWidth: "80%" }}
              variant="text"
              size="small"
              onClick={() => navigate("/login")}
            >
              Log in to account
            </Button>
          </div>
        </div>
      </div>
      {options.status === "Successful" ? <Navigate to="/login" replace /> : ""}
    </div>
  );
}
