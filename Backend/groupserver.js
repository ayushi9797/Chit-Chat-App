const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const app = express()
const Qs = require("qs")

// function
const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require("../frontend/utils/users")
const formateMessage = require("../frontend/utils/message")

//server connection 
const server = http.createServer(app)
const io = socketio(server)


const boatName = "Masai Server";

io.on("connection", (socket) => {

    console.log("one client joined")

    socket.on("joinRoom", ({ username, room }) => {


        const user = userJoin(socket.id, username, room)

        socket.join(user.room);

        // Welcome current 
        socket.emit("message", formateMessage(boatName, "Welcome to Chit-Chat"))

        // broadcat to other users
        socket.broadcast.to(user.room).emit("message", formateMessage(boatName, `${user.username} has joined the chat`))

        //  Get all room user
        io.to(user.room).emit("roomUsers", {
            room: user.room, users: getRoomUsers(user.room)
        })

    })


    socket.on("chatMessage",(msg)=>{
          const user = getCurrentUser(socket.id)
          io.to(user.room).emit("message",formateMessage(user.username,msg))
    });


    socket.on("disconnect",()=>{
        
        const user = userLeave(socket.id)

        io.to(user.room).emit("message",formateMessage(boatName,`${user.username} has left the chat`))

          //  Get all room user
          io.to(user.room).emit("roomUsers", {
            room: user.room, users: getRoomUsers(user.room)
        })

    })

});





const PORT = 8080
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))