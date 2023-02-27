const express = require("express");
const app = express();
const { connection } = require("./config/db");
const socketio = require("socket.io");
const http = require("http");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { userRouter } = require("./routes/user.route");
const { chatRouter } = require("./routes/chat.route");
const path = require("path");
const { messageRouter } = require("./routes/messageroute");

app.use(cors({ origin: "*" }));
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);


const STATIC_FILES_PATH = path.resolve("../frontend");
app.use(express.static(STATIC_FILES_PATH));

const Qs = require("qs");

// function
const {
  userJoin,
  getRoomUsers,
  getCurrentUser,
  userLeave,
} = require("../frontend/utils/users");
const formateMessage = require("../frontend/utils/message");

//server connection
const server = http.createServer(app);
const io = socketio(server);

const boatName = "Chit-Chat-App";

io.on("connection", (socket) => {
  console.log("one client joined");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current
    socket.emit("message", formateMessage(boatName, "Welcome to Chit-Chat"));

    // broadcat to other users
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formateMessage(boatName, `${user.username} has joined the chat`)
      );

    //  Get all room user
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formateMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    io.to(user.room).emit(
      "message",
      formateMessage(boatName, `${user.username} has left the chat`)
    );

    //  Get all room user
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});

const PORT = 8080;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
