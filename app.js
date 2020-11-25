const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')
const moment = require('moment')
const morgan = require('morgan')
const winston = require('winston')

const app = express()
app.use(morgan('tiny'))

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

io.on('connection',socket => {
    console.log('User just connected')

    //to the single client connecting
    socket.emit('message','Welcome to my app')

    //Broadcast when a user connected to all users except that particular user that connected
    socket.broadcast.emit('message',)

    //to all the clients in general
    //io.emit()
})




server.listen(3000,() => {
    winston.info("----Project is up and running----")
});
