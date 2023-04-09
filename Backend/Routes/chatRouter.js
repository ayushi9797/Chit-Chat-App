const express = require("express");
const {auth}=require("../middleWares/authMiddleware")
const {addGroup,removeGroup,renameGroup,groupChat,createChat,getChat}=require("../controllers/chatControllers")
const chatRouter = express.Router();

 chatRouter.route("/").get(auth,getChat)
chatRouter.route("/").post(auth, createChat)
chatRouter.route("/group").post(auth, groupChat)
chatRouter.route("/rename").put(auth, renameGroup)
chatRouter.route("/removegroup").put(auth, removeGroup)
chatRouter.route("/add").put(auth, addGroup)




module.exports={chatRouter}