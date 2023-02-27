const express = require("express");
// const app = express();
// const { connection } = require("./config/db");
// const http = require("http");
// const colors = require("colors");
// const cors = require("cors");
// require("dotenv").config();
// const { userRouter } = require("./routes/user.route");
// const { chatRouter } = require("./routes/chat.route");
// const path = require("path");
// const { messageRouter } = require("./routes/messageroute");
// const server = http.createServer(app);
// const PORT = process.env.port;

// app.use(cors({ origin:"*" }));
// app.use("/user", userRouter);
// app.use("/chat", chatRouter);
// app.use("/message", messageRouter);

// server.listen(PORT, async () => {
//   try {
//     await connection;
//     console.log("Connected To Db".cyan.underline);
//   } catch (error) {
//     console.log("Not Connected To Db".red.underline);
//     console.log(error);
//   }
//   console.log(`Server is listenig on :${PORT}`.yellow.bold);
// });

// // Boat Name
// const boatName = "Chit-Chat App";

// // Directory Part
// const STATIC_FILES_PATH = path.resolve("../frontend");
// app.use(express.static(STATIC_FILES_PATH));

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     let chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });

//   socket.off("setup",()=>{
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//     });

// });

// // ****************Expreriment
