const express = require("express");
const app = express();
const { connection } = require("./config/db");
const http = require("http");
const colors = require("colors");
require("dotenv").config();
const { Server } = require("socket.io");
const { userRouter } = require("./routes/user.route");
const { chatRouter } = require("./routes/chat.route");
const { chats } = require("./data/data");
const server = http.createServer(app);
const PORT = process.env.port;

app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.use("/user", userRouter);
app.use("/chat", chatRouter);

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected To Db".yellow.bold);
  } catch (error) {
    console.log("Not Connected To Db");
    console.log(error);
  }
  console.log(`Server is listenig on :${PORT}`.yellow.bold);
});

// Boat Name
const boatName = "Chit-Chat App";

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connected...to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket._cleanup.emit("connected");
  });
  // To join Chat room
  socket.on("joinRoom", ({ username, room }) => {
    //socket.id is the is assigned by  the socket.io
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    //welcome message to user joined the chat room
    socket.emit("message", formatMesage(boatName, "Welcome to  Chit-Chat App"));
    //boradcast others as new user joined
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMesage(boatName, `${user.username} has joined the chat room`)
      );
  });

  // To receive message from frontend
  socket.on("new message", (msg) => {
    console.log(msg);
    var chat = msg.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == msg.sender._id) return;
      socket.in(user._id).emit("message received", msg);
    });
  });

  // Disconnect or leave the user
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    io.to(user.room).emit(
      "message",
      formatMesage(boatName, `${user.username} left the chat`)
    );
    //update the chat room
    io.to(user.room).emit("getroomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
});
