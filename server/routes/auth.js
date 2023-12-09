const express = require("express");
const router = express.Router();
const UserDao = require("../dao/userDao");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    const checkUsername = await UserDao.findUsername(userData.username);

    if (checkUsername) {
      return res.status(200).json({
        message: "Username already exist",
      });
    }

    const newUser = await UserDao.register(userData);

    res.status(201).json({
      message: "User registration successful",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Registration failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await UserDao.login(username, password);

    if (!response.status) {
      res.status(200).json({
        message: response.message,
      });
    } else {
      const accessToken = jwt.sign(
        {
          id: response.user.id,
          name: response.user.name,
          username: response.user.username,
          profilePhoto: response.user.profile_photo,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "60m",
        }
      );

      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });

      res.status(200).json({
        message: response.message,
        accessToken,
      });
    }
  } catch (error) {
    console.debug("Login failed");
    console.log(error);
    res.status(500).json({
      error: "Login failed",
    });
  }
});

module.exports = router;
