require('dotenv').config();
const jwt=require("jsonwebtoken")
const fs=require("fs");
const redis=require("redis");

// redis
const client=redis.createClient();
// client error
client.on("error",err=>console.log("Redis client error",err));
// connect the client
client.connect()

const authenticate=async(req,res,next)=>{
const token= await client.GET("token");
if(!token){
    res.send("PLease LOgin First")
}
const blacklistData=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
if(blacklistData.includes(token)){
    return res.send({"msg":"PLease LOgin First"})
}
jwt.verify(token,process.env.key , function(err, decoded) {
    if(err){
        res.send({"msg":"PLease LOgin First","err":err.message})
    }else{
        const userID=decoded.userID
        req.body.userID=userID
        next()
    }
  });
};

module.exports={authenticate}