const mongoose=require("mongoose");

const chatSchema=mongoose.Schema({

    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    // users will be get from the users model
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    // latest message from messages
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    // by refering the group chat type
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        "ref":"User"
    },
},
// timestamp of every data
{timestamps:true}
)

const Chat=mongoose.model("Chat",chatSchema);

module.exports={Chat};