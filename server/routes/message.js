const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const MessageDao = require("../dao/messageDao");

// send message between users
router.post("/", authenticateToken, async (req, res) => {
  try {
    const io = req.app.io;

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("join-room", (room) => {
        socket.join(room);
      });

      socket.on("send-message", (message, room) => {
        socket.to(room).emit("receive-message", message);
      });
    });

    const data = {
      sender_id: req.user.id,
      receiver_id: req.body.receiver_id,
      message: req.body.message,
    };

    const chat = await MessageDao.createMessage(data);

    if (chat) {
      res.status(201).json({
        message: "Message sent",
        chat,
        user: req.user,
      });
    } else {
      res.status(404).json({
        message: "Message failed",
      });
    }
  } catch (error) {
    throw error;
  }
});

// get particular chat conversations of a user
router.get("/:user_id", authenticateToken, async (req, res) => {
  try {
    const member1 = req.user.id;
    const member2 = req.params.user_id;
    const chatMessages = await MessageDao.getMessages(member1, member2);

    if (chatMessages) {
      res.status(200).json({
        message: "Successful",
        chatMessages,
      });
    } else {
      res.status(500).json({
        message: "Failed, try again",
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
