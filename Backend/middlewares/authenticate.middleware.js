require('dotenv').config();
const jwt=require("jsonwebtoken")
const fs=require("fs");
const redis=require("redis");
const { UserModel } = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

// redis
const client=redis.createClient();
// client error
client.on("error",err=>console.log("Redis client error",err));
// connect the client
client.connect()

const protect = async (req, res, next) => {
    const token = await client.GET("token");
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.key);
        // console.log(decoded)
        req.user = await UserModel.findById(decoded.userID);
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
    }

    if (!token) {
        throw new Error("Not authorized, no token");
    }
}


module.exports={protect}