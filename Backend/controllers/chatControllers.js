const asynchandler = require('express-async-handler');
const { Chat } = require("../models/ChatModel")
const { User } = require("../models/userModel")


// get all chat
const getChat = asynchandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt:-1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: 'latestMessage.sender',
                    select: "name pic email"
                });
                res.status(200).send(results)
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// create a new Chat
const createChat=asynchandler(async(req,res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400)
    }
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password")
        .populate("latestMessage");
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name pic email"
    })
    if (isChat.length>0) {
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, userId]
        };
        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).json(FullChat)
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

// create a group chat
const groupChat = asynchandler(async(req,res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill All the Fields" });
    }
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400)
            .send("More thrn two users are required to form a group chat");
    }
    users.push(req.user)
    try {
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin:req.user
        })
        const FullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(FullGroupChat);

    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

// rename the group
const renameGroup = asynchandler(async(req,res) => {
    const { chatId, chatName } = req.body;
    const updateGroupName = await Chat.findByIdAndUpdate(
        chatId, {
        chatName: chatName
    }, {
        new: true,
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updateGroupName) {
        res.status(404);
        throw new Error(error.message)
    } else {
        res.json(updateGroupName)
    }
})

// remove from group
const removeGroup = asynchandler(async(req,res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        }, {
        new: true
    },
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed)
    }
})











// add to group

const addGroup = asynchandler(async(req,res) => {
    const { chatId, userId } = req.body;

    const added =await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        }, {
        new: true
    },
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added)
    }
})

module.exports={addGroup,removeGroup,renameGroup,groupChat,createChat,getChat}