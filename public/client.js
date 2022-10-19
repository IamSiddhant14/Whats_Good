const socket = io();
let namee;
let textarea = document.querySelector('textarea');
let messageArea = document.getElementById('messageArea');
let divname = document.getElementById('namer');

do{
  namee = prompt('Please entre your name');
}while(!namee){

}

divname.innerHTML = namee;
textarea.addEventListener('keyup', (e) => {
    
    if(e.key === "Enter" ) {
        sendMessage(e.target.value)
    }
})

function sendMessage(message){

    let msg={
        user:namee,
        message:message.trim()
    }

    //Append
    appendMessage( msg , 'outgoing' );
    textarea.value = ''
    scrollToBottom()

    //Send to Server
    socket.emit('message',msg);//event , message which is to be sent to server

}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
`
mainDiv.innerHTML = markup
messageArea.appendChild(mainDiv)

}

//Recive message

socket.on('message' , (msg) =>{
    
    appendMessage(msg , 'incoming');
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}