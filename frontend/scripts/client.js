
const socket = io("http://localhost:8080/", { transports: ["websocket"] });


socket.emit("message", (msg) => {
  console.log(msg);
});






