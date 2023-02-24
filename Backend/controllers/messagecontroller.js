const { response } = require("express");
const asynchandler = require("express-async-handler");
const { ChatModel } = require("../Models/chatModel");
const {MessageModel}=require("../Models/messageModel");
const { UserModel } = require("../Models/userModel");

const sendMessage = asynchandler(async (req,res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
        
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    try {
        var message = await MessageModel.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await UserModel.populate(message, {
            path: "chat.users",
            select: "name pic email"
        });
        await ChatModel.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    };
});
    
// Get All Messages
const allMessages = asynchandler(async(req, res) => {
    try {
        const messages = await MessageModel.find({ chat: req.params.chatId })
            .populate(
                "sender",
                "name pic email"
            )
            .populate("chat");
        res.json(messages)
    } catch (error) {
                res.status(400);
                throw new Error(error.message);
    }
}) 


module.exports = { sendMessage, allMessages };
