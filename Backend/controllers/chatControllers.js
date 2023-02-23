const asynchandler=require("express-async-handler");
const { update } = require("tar");
const { ChatModel } = require("../Models/chatModel");
const { UserModel } = require("../Models/userModel");
const accessChat = asynchandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("USERId params not sent with request");
        return res.send.sendStatus(400);
    }
    var isChat = await ChatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-pass")
        .populate("latestMesssage");
    isChat = await UserModel.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        try {
            const createdChat = await ChatModel.create(chatData);
            const FullChat = await ChatModel.findOne({
                _id: createdChat._id,
            })  .populate("users", "-pass")
     
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});


// All Chat of USer

const fetchChats = asynchandler(async (req, res) => {
    try {
        ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-pass")
            .populate("groupAdmin", "-pass")
            .populate("latestMessage")
            .sort({ updateAt: -1 })
            .then(async (results) => {
                results = await UserModel.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
});


// Create a group Chat
const createGroupChat = asynchandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({message:"Please Fill All the fields"})
    }
    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400)
        .send("More Than 2 users are required to form a group chat")
    }
    
})

module.exports={accessChat,fetchChats,createGroupChat}