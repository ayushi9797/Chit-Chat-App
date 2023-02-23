const express = require("express");
const { ChatModel } = require("../Models/chatModel");
const { UserModel } = require("../Models/userModel");

const chatRouter = express.Router();
const { accessChat, fetchChats, createGroupChat } = require("../controllers/chatControllers");
const  {protect}  = require("../middlewares/authenticate.middleware");
chatRouter.use(express.json());

chatRouter.route("/").post(protect, accessChat);
chatRouter.route("/").get(protect, fetchChats);

chatRouter.route("/group").post(protect, createGroupChat);

// chatRouter.route("/rename").put(authenticate, renameGroup);

// chatRouter.route("/groupremove").put(authenticate, removeFromGroup);

// chatRouter.route("/groupadd").post(authenticate, addToGroup);

module.exports={chatRouter}