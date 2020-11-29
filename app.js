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

    //to the single client connecting
    socket.emit('message',formateMessage(appName,'Welcome to chat-app!'));

    //Broadcast when a user connected to all users except that particular user that connected
    socket.broadcast.emit('message',formateMessage(appName,'A user has joined the chat','group'));

    // listen to chat message
    socket.on('chatMessage', (username,msg,groupName) => {
        io.emit('message',formatMessage(username,msg,groupName))
    })

    //when client disconnet
    socket.on('disconnect', () => {
        io.emit('message',formatMessage(appName,'A user has left the chat'))
    })
})

const port = 6001


http.listen(port, () => console.error(`listening on http://localhost:${port}`));

// socket.on('joinRoom', ({username , room }) => {

    //to all the clients in general
    //io.emit()

    //listen to chat message
    // socket.on('chatMessage', msg => {
    //     io.emit('message',formatMessage('user',msg))
    // })