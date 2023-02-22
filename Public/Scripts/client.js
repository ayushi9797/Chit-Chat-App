const socket = io("http://localhost:8080/", { transports: ["websocket"] });
let textArea=document.querySelector("#textarea");
let messageArea=document.querySelector(".message_area");


//giving name to user*****
// let nam=document.getElementById("");
// let nam
// do{
//     nam=prompt("Please enter your nam :")
// }while(!nam);



textArea.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
let msg={
    user:nam,
    message:message.trim()
}
//append the message
appendMessage(msg,'outgoing');

// to emty the textares
textArea.value = ''
scrollToBottom();

    //**** */ Send to server ******
    socket.emit('message', msg)
}

// function appendMessage(msg,type){
//     let mainDiv=document.createElement('div')
//     let className=type;
//     mainDiv.classList.add(className,'message');

//     let markup=`
//     <h4>${msg.user}</h4>
//     <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML=markup;
//     messageArea.appendChild(mainDiv)
// }

// *****receive Message****
socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
    scrollToBottom();
})

//to make message height to bottom
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}

