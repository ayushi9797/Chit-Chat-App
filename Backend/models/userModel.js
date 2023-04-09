const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
},
    {
        timestamp: true
    });

// mathc the password
userSchema.methods.matchPassword = async function(enteredPassword)  {
    return await bcrypt.compare(enteredPassword,this.password)
}

// before the save to MongoDb
userSchema.pre('save', async function(next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

const User = mongoose.model("User", userSchema);
module.exports={User}