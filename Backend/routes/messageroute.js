const exppress = require("express");
const messageRouter = exppress.Router();
messageRouter.use(exppress.json());
const {
  sendMessage,
  allMessages,
} = require("../controllers/messagecontroller");
const { protect } = require("../middlewares/authenticate.middleware");

messageRouter.route("/").post(protect, sendMessage);

messageRouter.route("/:chatId").get(protect, allMessages);


module.exports={messageRouter}