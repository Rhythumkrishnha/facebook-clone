const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const ConversationDao = require("../dao/conversationsDao");
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await ConversationDao.getAllConversation(userId);

    if (conversations) {
      res.status(200).json({
        message: "Successful",
        conversations,
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
