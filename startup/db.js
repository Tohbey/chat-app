const mongoose = require('mongoose')
// const MongoClient = require("mongodb").MongoClient;

// const winston = require('winston')
require('dotenv').config()

const dbURL = process.env.MONGO_URL


module.exports = function(){
    mongoose.connect(dbURL)
    .then(() => console.log('-------Successfully connected to MongoDB-------'))
}