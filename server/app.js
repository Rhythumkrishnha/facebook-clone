const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("node:http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// attach socket.io instance to app object
app.io = io;

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const cookieParser = require("cookie-parser");
const commentRoute = require("./routes/comment");
const likeRoute = require("./routes/like");
const messageRoute = require("./routes/message");
const conversationsRoute = require("./routes/conversations");
const feedRoute = require("./routes/feed");
const profileRoute = require("./routes/profile");
const userRoute = require("./routes/users");
const friendRoute = require("./routes/friend");

dotenv.config();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // false for parsing appliction/x-www-form-urlencoded
app.use(cookieParser()); // for parsing cookies attached to incoming HTTP request
const PORT = process.env.PORT;
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/like", likeRoute);
app.use("/message", messageRoute);
app.use("/conversations", conversationsRoute);
app.use("/feed", feedRoute);
app.use("/profile", profileRoute);
app.use("/users", userRoute);
app.use("/friend", friendRoute);

server.listen(PORT, () => {
  console.log(
    `Facebook server is up and running on port http://localhost:${PORT}`
  );
});
