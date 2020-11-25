const express = require('express')
const user = require('../controller/user')
const group = require('../controller/group')
const auth = require('../controller/auth')

module.exports = function(app){
    app.use(express.json());
    app.use('/users',user);
    app.use('/groups',group);
    app.use('/auth',auth)
}