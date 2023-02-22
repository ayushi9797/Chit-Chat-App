const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    mobile_number:Number,
    email:String,
    pass:String,
})

const UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}