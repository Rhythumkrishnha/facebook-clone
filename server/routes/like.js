const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const LikeDao = require("../dao/likeDao");

// like user post
router.post("/:post_id", authenticateToken, async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user_id = req.user.id;

    const like = await LikeDao.createPostLike(post_id, user_id);

    if (!like) {
      res.status(404).json({
        message: "Error",
      });
    } else {
      res.status(201).json({
        message: "Post liked successfully",
        user: req.user,
        like,
      });
    }
  } catch (error) {
    throw error;
  }
});

// get all likes of a post
router.get("/:post_id", authenticateToken, async (req, res) => {
  try {
    const post_id = req.params.post_id;

    const postLikes = await LikeDao.getPostLikes(post_id);

    if (!postLikes) {
      res.status(404).json({
        message: "Error fetching likes",
      });
    } else {
      res.status(200).json({
        message: "Successful",
        user: req.user,
        postLikes,
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
