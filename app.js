const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')
const moment = require('moment')
const morgan = require('morgan')
const winston = require('winston')
const formateMessage = require('./utils/messages')
const formatMessage = require('./utils/messages')
const cors = require('cors')

const app = express()
app.use(morgan('tiny'))
app.use(cors())
require('./startup/db')()
require('./startup/router')(app)
app.get('',(req,res) => {
    res.send({
        title:'Chat-App',
        name:'Fafowora Oluwatobiloba'
    })
});

const server = http.createServer(app)
const io = socketIO(server)

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

const appName = "Chat-app"

io.on('connection',socket => {
    socket.on('joinRoom', ({username , room }) => {

        //to the single client connecting
        socket.emit('message',formateMessage(appName,'Welcome to chat-app!'));

        //Broadcast when a user connected to all users except that particular user that connected
        socket.broadcast.emit('message',formateMessage(appName,'A user has joined the chat'));

        //when client disconnet
        socket.on('disconnect', () => {
            io.emit('message',formatMessage(appName,'A user has left the chat'))
        })
    })

    //to all the clients in general
    //io.emit()

    //listen to chat message
    socket.on('chatMessage', msg => {
        io.emit('message',formatMessage('user',msg))
    })

})




server.listen(3000,() => {
    winston.info("----Project is up and running----")
});
