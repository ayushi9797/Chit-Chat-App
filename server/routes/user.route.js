const express=require("express");
const {UserModel}=require("../models/user.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const redis=require("redis");
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

userRouter.get("/",async(req,res)=>{
    try {
        const data=await UserModel.find();
        res.send(data);
        console.log(data);
    } catch (error) {
        res.send("err:Not able to get the all users data");
        console.log(error);
    }
});

//POST the user signup data

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,mobile_number}=req.body;
    try {
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err){
                console.log(err);
            }else{
                const data=new UserModel({name,email,pass:hash,mobile_number});
                await data.save();
                res.send("Registration is successsfull");
                console.log(data);
            }
        });
    } catch (error) {
        res.send("err:user is not able to register");
        console.log(error);
    }
})

//POST sign in route

userRouter.post("/login",async(req,res)=>{
    const {mobile_number,pass}=req.body;
    const user=await UserModel.findOne({mobile_number});
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