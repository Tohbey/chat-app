const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const select = document.getElementById('room')

//mesage from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)

    //scroll down 
    // chatMessages.scrollTop = chatMessages.scrollHeight;
})

getUsers().then(data => {
    users = data
    console.log('users ', users)
})

let groups;
getGroups().then(data =>{
    groups = data   
    console.log('groups ', groups)    
})


// socket.emit('joinRoom', { username, room })

//output message to DOM
// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }
  
  // Add room name to DOM
  function outputRoomName(room) {
    roomName.innerText = room;
  }
  
  // Add users to DOM
  function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach(user=>{
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
   }
  

function getInputValue(){
    // Selecting the input element and get its value 
    var username = document.getElementById("usrname").value;
    var room = document.getElementById("room").value;
    
    // Displaying the value
    console.log('email ',email);
    console.log('passowrd ',password);
}


//emiting message
function postChat(){
    var chat = document.getElementById('msg').value;

    //emiting message to the server
    socket.emit('chatMessage',chat)
}

//signup
function signup(){
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var bio = document.getElementById('bio').value;
    var room = document.getElementById('room').value;

    let user = ({
        firstName,lastName,email,username,phoneNumber,password,bio,room
    })

    console.log(user)
}

//apis
async function getUsers(){
    let response = await fetch('http://localhost:3000/users');
    let data = await response.json()
    return data;
}

async function getUserById(id){
    let response = await fetch('http://localhost:3000/users/'+id);
    let data = await response.json()
    return data;
}

async function getUserByUsername(username){
    let response = await fetch('http://localhost:3000/users/'+username);
    let data = await response.json()
    return data;
}

async function getUserGroups(id){
    let response = await fetch('http://localhost:3000/users/userGroup'+id);
    let data = await response.json()
    return data;
}

async function creatUser(user){
    let response = await fetch('http://localhost:3000/users',{
        method:'Post',
        body:JSON.stringify(user)
    });
    let data = await response.json()
    return data;
}

async function updateUser(user){
    let response = await fetch('http://localhost:3000/users/'+user._id,{
        method:'Put',
        body:JSON.stringify(user)
    });
    let data = await response.json()
    return data;
}

async function getGroups(){
    let response = await fetch('http://localhost:3000/groups');
    let data = await response.json()
    return data;
}