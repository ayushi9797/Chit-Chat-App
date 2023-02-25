const users = [];
//details of users who joined the chat
const userJoin = (id, username, room) => {
  const user = {
    id,
    username,
    room,
  };
  users.push(user);
  return user;
};

//All current users in room
const getCurrentUser = (id) => {
  return users.find((user) => user.id == id);
};

const getRoomUsers = (room) => {
  return users.filter((user) => user.room == room);
};

const userLeave = (id) => {
  const index = users.findIndex((user) => user.id == id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave,
};
