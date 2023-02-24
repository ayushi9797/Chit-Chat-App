const express = require("express");
const app = express();
const {connection}=require("./config/db")
 const http = require("http");
const colors=require("colors")
require('dotenv').config();
const { userRouter } = require("./routes/user.route");
const {chatRouter}=require("./routes/chat.route")
const { chats } = require("./data/data");
const {messageRouter}=require("./routes/messageroute")
// const server = http.createServer(app);
const PORT = process.env.port


app.use("/user", userRouter);
app.use("/chat", chatRouter)
app.use("/message",messageRouter)


app.get("/", (req, res) => {
    res.send("Welcome to Home Page")
});






app.listen(PORT, async() => {
    try {
        await connection;
        console.log("Connected To Db".yellow.bold);
    } catch (error) {
        console.log("Not Connected To Db");
        console.log(error);
    }
    console.log(`Server is listenig on :${PORT}`.yellow.bold);
})