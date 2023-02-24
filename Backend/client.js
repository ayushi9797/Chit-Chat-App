const socket = io("http://localhost:8080/", { transports: ["websocket"] });

// GET Message Area From The HTML
let textArea = document.querySelector("");
let messageArea = document.querySelector("");

// Fetch here api of localhost:8080/message

// Get Name OF person who send the chat by fetching the users data
let name


//**************** */ join chat**********************
socket.emit("joinRoom", selectRoom._id);





// Addding the Message in text Area On Enter
textArea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

socket.emit("setup", user)

socket.on("connection", () => {
    
})




//******************* */ send MessageGunctio***********************

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    //append the message
    appendMessage(msg, 'outgoing');

    textArea.value = ''
    scrollToBottom();
    
    socket.emit("new message", msg)
    e.target.elements.msg.value = "";
    // type anywhre but msg wil be types in inout box
     e.target.elements.msg.focus();
}




// Function to append the message received from others
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}
// receive Message

socket.on("message received", ( msg) => {
     appendMessage(msg, "incoming");
     scrollToBottom();
})

//to make message height to bottom
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}


//diconnect the chat
// ****add leave btns ID here
document.getElementById("leave-btn").addEventListener('click',(e)=>{
    const leaveRoom=confirm("Are you shure, you want to leave room");
    if(leaveRoom){
        window.location.href="./index.html"
    }
})
