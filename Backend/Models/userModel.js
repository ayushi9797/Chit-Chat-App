const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    pass: {
        type: String,
        required: true
    },
    pic: {
    type: String,
    default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel };