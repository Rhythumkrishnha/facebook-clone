const express = require("express");
const router = express.Router();
const PostDao = require("../dao/postDao");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");
const authenticateToken = require("../middleware/authenticateToken");

// get all posts of a user
router.get("/:user_id", authenticateToken, async (req, res) => {
  try {
    const author_id = req.params.user_id;
    const posts = await PostDao.getPostByUserId(author_id);

    if (!posts) {
      res.status(200).json("No posts found");
    } else {
      res.status(200).json({
        message: "Successful",
        user: req.user,
        posts,
      });
    }
  } catch (error) {
    res.status(500).json("Failed");
  }
});

// get a post with post id
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { post_id } = req.query;
    const post = await PostDao.getPostById(post_id);

    if (post) {
      res.status(200).json({
        message: "Succesful",
        user: req.user,
        post,
      });
    } else {
      res.status(404).json({
        message: "Error, try again",
      });
    }
  } catch (error) {
    throw error;
  }
});

// post creation
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { content } = req.body;
      const authorId = req.user.id;

      const file = await cloudinary.uploader.upload(req.file.path);
      // const binaryData = await fs.promises.readFile(file.path); // fs.promises reads the entire file into a buffer

      const post = await PostDao.createPost(content, file.secure_url, authorId);

      if (!post) {
        res.status(404).json("Invalid or malformed data");
      } else {
        // if (tagList.length) {
        //   await tagList.forEach((user) => {
        //     PostDao.tagUser(post.id, user);
        //   });
        // }
        res.status(201).json({
          message: "Post creation successful",
          user: req.user,
          post,
        });
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

module.exports = router;
