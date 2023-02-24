const express = require("express");
const { ChatModel } = require("../Models/chatModel");
const { UserModel } = require("../Models/userModel");

const chatRouter = express.Router();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const  {protect}  = require("../middlewares/authenticate.middleware");
chatRouter.use(express.json());

chatRouter.route("/").post(protect, accessChat);
chatRouter.route("/").get(protect, fetchChats);

chatRouter.route("/group").post(protect, createGroupChat);

chatRouter.route("/renamegroup").patch(protect, renameGroup);

chatRouter.route("/removeFromGroup").put(protect, removeFromGroup);

chatRouter.route("/addToGroup").put(protect, addToGroup);

module.exports={chatRouter}