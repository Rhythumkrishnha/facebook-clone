const express = require("express");
const UserDao = require("../dao/userDao");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/:user_id", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await UserDao.findUserById(userId);

    if (user) {
      res.status(200).json({
        message: "Successful",
        user,
      });
    }
  } catch (error) {
    throw error;
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await UserDao.getAllUsers();

    if (users) {
      res.status(200).json({
        message: "Successful",
        users,
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
