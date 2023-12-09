const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const CommentDao = require("../dao/commentDao");

// comment on a post
router.post("/:post_id", authenticateToken, async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user_id = req.user.id;
    const { content, parent_comment_id } = req.body;

    const comment = await CommentDao.createPostComment(
      content,
      post_id,
      user_id,
      parent_comment_id
    );

    if (comment) {
      res.status(201).json({
        message: "Comment creation successful",
        user: req.user,
        comment,
      });
    } else {
      res.status(404).json({
        message: "Error! try again later",
      });
    }
  } catch (error) {
    throw error;
  }
});

// get comments of a post
router.get("/:post_id", async (req, res) => {
  try {
    const post_id = req.params.post_id;

    const comments = await CommentDao.getPostComments(post_id);

    if (!comments) {
      res.status(404).json({
        message: "Error fetching comments",
      });
    } else {
      res.status(200).json({
        message: "Successful",
        comments,
      });
    }
  } catch (error) {
    throw error;
  }
});

// like user comment
router.post(
  "/:comment_id/like",
  authenticateToken,
  async (req, res) => {
    try {
      const user_id = req.user.id;
      const comment_id = req.params.comment_id;

      const like = await CommentDao.createCommentLike(user_id, comment_id);

      if (!like) {
        res.status(404).json({
          message: "Error, try again",
        });
      } else {
        res.status(201).json({
          message: "Comment liked successfully",
          user: req.user,
          like,
        });
      }
    } catch (error) {
      throw error;
    }
  }
);

module.exports = router;
