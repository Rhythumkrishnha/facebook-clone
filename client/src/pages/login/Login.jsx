import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [options, setOptions] = useState({
    error: false,
    errorMessage: "",
    visibility: false,
    status: "",
  });

  const handleEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/auth/login", user);
      const responseMessage = response.data.message;
      console.log(response);
      
      if (responseMessage !== "Login successful") {
        setOptions({ ...options, error: true, errorMessage: responseMessage });
      } else {
        setOptions({
          ...options,
          error: false,
          errorMessage: "",
          status: "Successful",
        });

        const accessToken = response.data.accessToken;
        const userData = jwtDecode(accessToken);

        window.sessionStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <TextField
              style={{ maxWidth: "90%", minWidth: "90%" }}
              label="Username"
              variant="outlined"
              className="loginInput"
              size="small"
              name="username"
              onChange={handleEvent}
            />
            <TextField
              style={{ maxWidth: "90%", minWidth: "90%" }}
              label="Password"
              variant="outlined"
              className="loginInput"
              type={options.visibility ? "text" : "password"}
              size="small"
              InputProps={{
                endAdornment: (
                  <VisibilityIcon
                    className="visibilityIcon"
                    onClick={() =>
                      setOptions({
                        ...options,
                        visibility: !options.visibility,
                      })
                    }
                  />
                ),
              }}
              name="password"
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
              Log In
            </Button>
            {/* <span className="loginForgot">Forget Password</span> */}
            <Button
              style={{maxWidth: '80%', minWidth: '80%'}}
              variant="text"
              size="small"
              onClick={() => navigate("/register")}
            >
              Create a new account
            </Button>
          </div>
        </div>
      </div>
      {options.status === "Successful" ? <Navigate to="/" replace /> : ""}
    </div>
  );
}
