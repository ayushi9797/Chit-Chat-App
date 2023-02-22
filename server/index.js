const express=require("express");
const {connection}=require("./config/db")
const {Server}=require("socket.io");
const http=require("http");
const path = require("path");
require('dotenv').config();
const {userRouter}=require("./routes/user.route");
const {authenticate}=require("./config/db")


// server
const app=express();

const httpServer=http.createServer(app)

const port=process.env.port || 3000;




// Routes
app.use("/user",userRouter);






httpServer.listen(port,async()=>{
    try {
        await connection;
        console.log(" Connected to The DataBase");
    } catch (error) {
        console.log("Not Able To Connect The DataBase");
    }
    console.log(`Server listening port ${port}`);
})

// mmiddleware to make static folder
app.use(express.static(path.join(__dirname ,'Public')))

const io= new Server(httpServer);

io.on("connection",(socket)=>{
    console.log('Connected...to socket.io');

    socket.on("message",(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})