const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const FriendDao = require("../dao/friendDao");
const UserDao = require("../dao/userDao");
const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;
    console.log(follower_id, following_id);

    const request = await FriendDao.createFriendRequest(
      follower_id,
      following_id
    );
    if (request) {
      res.status(201).json({
        message: "Request sent",
        request,
      });
    } else {
      res.status(400).json({
        message: "Request failed",
      });
    }
  } catch (error) {
    throw error;
  }
});

router.get("/requests/:following_id", authenticateToken, async (req, res) => {
  try {
    const { following_id } = req.params;
    const response = await FriendDao.getFriendRequests(following_id);
    const requests = [];
    for (follower of response) {
      const user = await UserDao.findUserById(follower.follower_id);
      requests.push(user);
    }

    if (requests) {
      res.status(200).json({
        message: "Successful",
        requests,
      });
    } else {
      res.status(204).json({
        message: "No record found",
      });
    }
  } catch (error) {
    throw error;
  }
});

// to check friendship status of an user
router.get("/status/:user_id", authenticateToken, async (req, res) => {
  try {
    const userId1 = req.user.id; // logged in user id
    const userId2 = req.params.user_id; // to check status with user id
    const request = await FriendDao.checkFriendRequest(userId1, userId2);

    if (request) {
      res.status(200).json({
        message: "Successful",
        request,
      });
    } else {
      res.status(209).json({
        message: "No record found",
      });
    }
  } catch (error) {
    throw error;
  }
});

// get all friends af an user
router.get("/:user_id", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.user_id;
    const friendList = await FriendDao.getFriendList(userId);

    const friends = [];
    for (let friend of friendList) {
      const user = await UserDao.findUserById(friend);
      friends.push(user);
    }

    if (friends) {
      res.status(200).json({
        message: "Successful",
        friends,
      });
    } else {
      res.status(209).json({
        message: "No friend",
      });
    }
  } catch (error) {
    throw error;
  }
});

router.put("/", async (req, res) => {
  try {
    const { follower_id, following_id } = req.body;
    const request = await FriendDao.acceptFriendRequest(
      follower_id,
      following_id
    );

    if (request) {
      res.status(201).json({
        message: "Friend request accepted",
        request,
      });
    }
  } catch (error) {
    throw error;
  }
});

// delete friend request
router.delete("/:user_id", authenticateToken, async (req, res) => {
  try {
    const following_id = req.user.id;
    const follower_id = req.params.user_id;

    await FriendDao.deleteFriendRequest(follower_id, following_id);

    res.status(204).json({
      message: "Request rejected",
    });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
