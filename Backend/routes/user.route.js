const express=require("express");
const { UserModel } = require("../Models/userModel");
const asynchandler=require("express-async-handler")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const redis = require("redis");
const { protect } = require("../middlewares/authenticate.middleware");
//create client
const client=redis.createClient();
//handle error
client.on("error",err=>console.log("Redis client error",err));
// connect the client
client.connect();
//router
const userRouter=express.Router();

//middelwares
userRouter.use(express.json())


// GET ALL USERS
userRouter.get("/",protect, async (req, res) => {
    let name = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { amil: { $regex: req.query.search, $options: "i" } }
        ]
    }:{}
    try {
        const data = await UserModel.find(name)
        // .find({ _id: { $ne: req.userID } });
      res.send(data);
      console.log(data);
    } catch (error) {
        res.send("err:Not able to get the all users data");
        console.log(error);
    }
});

//POST the user signup data

userRouter.post("/register",async(req,res)=>{
    const { name, email, pass, pic } = req.body;
    const user = await UserModel.findOne({ email });
    try {
        if (user) {
            res.status(400);
            throw new Error("User Allready Exists");
        } else {
            bcrypt.hash(pass, 5, async (err, hash) => {
                if (err) {
                console.log(err);
                } else {
                const data = new UserModel({
                    name,
                    email,
                    pass: hash,
                    pic,
                });
                await data.save();
                res.send("Registration is successsfull");
                console.log(data);
                }
            });
        }
        
    } catch (error) {
        res.send("err:user is not able to register");
        console.log(error);
    }
})

//POST sign in route

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    const user = await UserModel.findOne({ email });
    
    //console.log(user);
    const hash_pass=user.pass;

    try {
        bcrypt.compare(pass, hash_pass, async(err, result)=> {
            if(result){
                const token=jwt.sign({userID:user.id },process.env.key);
                const ref_token=jwt.sign({userID:user.id },process.env.ref_key);
                const response={"msg":"Sign in Successfull","token":token,"refToekn":ref_token}
                res.status(200).json(response);
                await client.SETEX("token",24*60*60,token);
                await client.SETEX("refToken",7*24*60*60,ref_token)

            }else{
                res.send("Wrong Credentials");
        console.log(err);
            }
        });
    } catch (error) {
        res.send("Wrong Credentials");
        console.log(error);
    }
});
// refreshToekn
userRouter.get("/refreshtoken",async(req,res)=>{
    // const refreshToken=req.headers.authorization.split(" ")[1];
    const refreshToken=await client.GET("refToken")
    try {
        if(!refreshToken){
            res.send({"msg":"Please Login First"})
        }else{
            jwt.verify(refreshToken,process.env.ref_key ,async function(err, decoded) {
                if(err){
                    res.send({"msg":"Please Login First"});
                    console.log(err);
                }else{
                    const token=jwt.sign({userID:decoded.user.id },process.env.key);
                const response={"msg":"Sign in Successfull","token":token}
                res.status(200).json(response);
                await client.SETEX("token",24*60*60,token);
                }
              });
        }
    } catch (error) {
        console.log(error);
    }
})

// logout and blacklisting
userRouter.get("/logout",async(req,res)=>{
    const token=await client.get("token");
    try {
        const blacklistData=JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
        blacklistData.push(token);
        fs.writeFileSync("./blacklist.json",JSON.stringify(blacklistData));
        res.send("logout Successfully")
    } catch (error) {
        console.log(error);
        res.send("Not able to logout")
    }
})
module.exports={userRouter}