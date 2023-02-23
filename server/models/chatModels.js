const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamp: true,
  }
);

const Chat = mongoose.model("chat", chatSchema);

module.exports = {
  Chat,
};

// db.find({ userID1, userID2 }).sort({ "timestamp" : -1 })
//   .skip(offset).limit(limit)

// db.find({ userID1, userID2 }).sort({ "timestamp" : -1 })
