const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require("socket.io")(http,{
    path:"/sio",
    transports:["websocket"]
})
const cors = require('cors')
const formateMessage = require('./utils/messages')
const formatMessage = require('./utils/messages')
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
require('./startup/db')()
require('./startup/router')(app)

app.get('',(req,res) => {
    res.send({
        title:'Chat-App',
        name:'Fafowora Oluwatobiloba'
    })
});



//Set static folder
app.use(express.static(path.join(__dirname,'public')));

const appName = "Chat-app"

io.on('connection',socket => {
    console.log('New Ws Connection...')
    
    socket.on('joinRoom',({username,room}) => {

        socket.join(room);

        //to the single client connecting
        socket.emit('message',formateMessage(appName,'Welcome to chat-app!',"Main"));

        //Broadcast when a user connected to all users except that particular user that connected
        socket.broadcast.to(room).emit(
            'message',formateMessage(appName,`A ${username} has joined the chat`,room
        ));
    })

    // listen to chat message
    socket.on('chatMessage', (username,msg,groupName) => {
        io.to(groupName).emit('message',formatMessage(username,msg,groupName))
    })
    
    // when client disconnet
    socket.on('disconnect', () => {
        io.emit('message',formatMessage(appName,'A user has left the chat',"Main"))
    })

    socket.on('leave', (username,groupName) => {
        io.to(groupName).emit('message',formatMessage(appName,`${username} has left the chat`,groupName))
    })
})

const port = 6001


http.listen(port, () => console.error(`listening on http://localhost:${port}`));

// socket.join(roomName);
// socket.to("admin").emit(eventName, Data);
// socket.join(nodejs);
// socket.to(“nodejs”).emit(eventName, Data);
