const express=require("express");
const app=express();
require('dotenv').config();
const {ConnectToDB}=require("./config/db")
const port = process.env.PORT || 5000;
const colors = require("colors");
const { userRouter } = require("./Routes/userRoutes");
const { chatRouter } = require('./Routes/chatRouter');
const {messageRouter}=require("./Routes/MessagesRoute")
const {notFound,errorHandler}=require("./middleWares/errorMiddleware");
const path=require("path")

app.use(express.json());


// users api
app.use("/api/user", userRouter);
// chat api
app.use("/api/chat", chatRouter)
// message api
app.use("/api/message",messageRouter)

// ******************deploymetn
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname1, "/frontend/build")));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is Running .....")
    })
    }
    
//*********deployment */


// error handling
app.use(notFound);
app.use(errorHandler)




const server=app.listen(port,()=>{
    console.log(`server is running on port ${port}`.yellow.bold);
    ConnectToDB()
})

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
