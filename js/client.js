const socket=io("http://localhost:8000");
const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageInp')
const messageContainer= document.queryselector(".container")
var audio=new Audio('ping-82822.mp3 ');
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
    
}

const name=prompt("enter your name to join");
socket.emit('new-user-joined,name')
socket.on('user-joined',name=>{
    append(`${name} joined the chat,'right`)
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message} joined the chat,'left`)
})
socket.on('left',name=>{
    append(`${data.name}left the chat`,'left')
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput='';
})
