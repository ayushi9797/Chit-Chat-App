const AsyncHandler = require("express-async-handler");
const { Chat } = require("../models/chatModels");
const User = require("../models/user.model");

const accessChat = AsyncHandler(async (req, res) => {
  const { userID } = req.body;
  if (!userID) {
    console.log("UserID: Not got userid from params");
    res.status(400).send({ UserID: "Not got userID from params" });
  }
  let isChat = await Chat.find({
    isGroupChat: flase,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userID } } },
    ],
  })
    .papulate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "laltestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatname: "sender",
      isGroupChat: false,
      users: [req.user._id, userID],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const Fullchat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchchats = AsyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: res.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error.message);
  }
});

const createGRoupChat = AsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please fill all the fields" });
  }
  let users = JSON.parse(req.body.users);
  if(users.length <2){
    return res
    .status(400).send("More then 2 users are required to form a group chat");
  }
  users.push(req.user);

  try{
    const groupChat = await Chat.create({
        chatName: req.body.name,
        users:users,
        isGroupChat:true,
        groupAdmin:req.user,
    });
    const fullGroupChat = await Chat.findOne({_id:groupChat._id});
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch(err){
    console.log(error);
    res.status(400);
    throw new Error(err.message);
    }
});

const renameGroup = AsyncHandler(async(req,res)=>{
    const {chatID, chatName} = req.body;
    const updatedChat = await Chat.findByIDAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password");

    if(!updatedChat){
        res.status(404);
        throw new Error("Chat not found");
    }else{
        res.json(updatedChat);
    }
});

const addToGroup = AsyncHandler(async(req,res)=>{
    const {chatId, userID} = req.body;
    const added = await Chat.findByIDAndUpdate(
        chatId,
        {
            $push:{users:userID},
        },
        {new:true}
    )
    .papulate("users","-password")
    .populate("groupAdmin", "-password");
    if(!added){
        res.status(404);
        throw new Error("Chat not found");
    }else{
        res.json(added);
    }
});

const removeFromGroup = AsyncHandler(async(req,res)=>{
    const {chatID, userID} = req.body;
    const remove = await Chat.findByIDAndUpdate(
        chatID,
        {
            $pull: {users:userID},
        },
        {new: true}
    )
    .populate("users","-password")
    .populate("groupAdmin","-password");
    if(!added){
        res.status(404);
        throw new error("Chat Not Found");
    }else{
        re.json(added);
    }
});
