const express = require("express");
const app = express();
const {connection}=require("./config/db")
 const http = require("http");
const colors=require("colors")
require('dotenv').config();
const path = require("path");
const { Server } = require("socket.io");
const { userRouter } = require("./routes/user.route");
const {chatRouter}=require("./routes/chat.route")
const server = http.createServer(app);
const PORT = process.env.port
// const frontend=require("../frontend")


app.use("/user", userRouter);
app.use("/chat",chatRouter)


// app.get("/", (req, res) => {
//     res.send("Welcome to Home Page")
// });






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

// app.use(express.static(__dirname + "/frontend"));
const STATIC_FILES_PATH = path.resolve( "../frontend");
app.use(express.static(STATIC_FILES_PATH));
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(STATIC_FILES_PATH, "../frontend\chat.html"));
// });

// console.log(__dirname, "/frontend");

// Boat Name
const boatName = "Chit-Chat App";

const io = new Server(server);

io.on("connection", (socket) =>{
  console.log("Connected to server");

  socket.on("message", (msg) => {
     msg="Hello Dilip"
     socket.broadcast.emit("message", msg);
   });
})