const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const {auth}=require("../middleWares/authMiddleware")
const userRouter = express.Router();
userRouter.route("/").get(auth,allUsers)
userRouter.route("/").post(registerUser)
 userRouter.post('/login',authUser)
// userRouter.route('/login').post(authUser)

module.exports={userRouter}
