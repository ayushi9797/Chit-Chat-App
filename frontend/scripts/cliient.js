// Searching for User in serach box[left side menu]

// const { Socket } = require("socket.io");
const socket = io("http://localhost:8080/", { transports: ["websocket"] });
let url = "http://localhost:8080";
let name = "Dilip";
let getData = async () => {
  const data = await fetch(`http://localhost:8080/user`); // pavan
  let a = await data.json();
  console.log(a);
};
getData();

//////////////////////////////////////////////////////////

// To Access Chat from list of chats[left side container] [selectin the person]
// it will give the created chat
try {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  const { data } = await axios.post(`/chat`, { userId }, config);
  console.log(data);
} catch (error) {
  console.log(error);
}

//////////////////////////////////////////////////////////

// fetching all the chats of the user

try {
  const { data } = await axios.get("/chat");
  console.log(data);
} catch (error) {
  console.log(error);
}

//////////////////////////////////////////////////////////

// craeting a group with users from db

try {
  const { data } = await axios.get(`/users?search=${searchingData}`);
  console.log(data);
} catch (error) {
  console.log(error);
}

try {
  const { data } = await axios.post(`/chat/group`, {
    name: groupChatName,
    users: JSON.stringify(selectedUsers.map((u) => u._id)),
  });
  console.log(data);
} catch (error) {
  console.log(error);
}

////////////////////////////////////////////////////////////

//  Creating group

// To Rename the Group Name

try {
  const { data } = await axios.put(`/chat/renamegroup`, {
    chatId: selectedChat._id,
    chatName: groupChatName,
  });
  console.log(data);
} catch (error) {
  console.log(error);
}

//   searching the user for adding to group

try {
  const { data } = await axios.get(`/users?search=${searchingData}`);
  console.log(data);
} catch (error) {
  console.log(error);
}

//   adding the user to group

try {
  const { data } = await axios.put(`/chat/addToGroup`, {
    chatId: selectedChat._id,
    userId: user1._id,
  });
  console.log(data);
} catch (error) {
  console.log(error);
}

// Remove the user from group

try {
  const { data } = await axios.put(`/chat/removeFromGroup`, {
    chatId: selectedChat._id,
    userId: user1._id,
  });
  console.log(data);
} catch (error) {
  console.log(error);
}

////////////////////////////////////////////////////////////

//  sendiing a message

try {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };
  const { data } = await axios.post(
    `/message`,
    { content: "newmessage", chatId: selectedChat._id },
    config
  );
  console.log(data);
} catch (error) {
  console.log(error);
}

////////////////////////////////////////////////////////////

// Fetching all messages

try {
  const { data } = await axios.get(`/message/${id}`);
  console.log(data);
} catch (error) {
  console.log(error);
}

//////////////////////////////////////////
/*
 for Socket.io
 install npm i socket.io-client
 inside js file

*/
const io = require("socket.io-client");
const endpoint = "url of backend server";
// let socket, selectedChatCompare;

socket = io(endpoint);
// it should give coneted to socket.io in a backend
socket.emit("setup", user);
socket.on("connected", () => setSocketConnected(true));
socket.on("typing", () => setIsTyping(true));
socket.on("stop typing", () => setIsTyping(false));

// fetching the data
socket.emit("join chat", selectedChat._id);

socket.on("message recieved", (newMessageRecieved) => {
  if (
    !selectedChatCompare ||
    selectedChatCompare._id !== newMessageRecieved.chat._id
  ) {
    //give notification
  } else {
    setMessages([...messages, newMessafeRevieved]);
  }
});

//inside send message function

socket.emit("new message", "data from api /message");

//typing funcationality

if (!socketConnected) return;

if (!typing) {
  setTyping(true);
  socket.emit("typing", selectedChat._id);
}
let lastTypingTime = new Date().getTime();
var timerLength = 3000;
setTimeout(() => {
  var timeNow = new Date().getTime();
  var timeDiff = timeNow - lastTypingTime;
  if (timeDiff >= timerLength && typing) {
    socket.emit("stop typing", selectedChat._id);
    setTyping(false);
  }
}, timerLength);

//stop te typing icon after typing
socket.emit("stop typing", selectedChat._id);


















