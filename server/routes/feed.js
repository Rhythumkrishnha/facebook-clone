const express = require("express");
const FeedDao = require("../dao/feedDao");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
      const feed = await FeedDao.fetchFeed();

    if (feed) {
      res.status(200).json({
        message: "Successful",
        feed,
      });
    } else {
      res.status(404).json({
        message: "Unable to fetch feeds",
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
