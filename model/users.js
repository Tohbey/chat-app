const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { GroupSchema } = require('./groups')

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    lastName:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email:{
        type: String,
        unique:true,
        required: true,
        minlength: 10,
        maxlength: 255
    },
    username:{
        type: String,
        unique:true,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    phoneNumber:{
        type:String,
        required:true,
        maxlength:11,
        minlength:8
    },
    password:{
        type:String,
        required:true,
        maxlength:1024,
        minlength:5
    },
    bio:{
        type:String,
        maxlength:500,
        minlength:10,
    },
    role:{
        type:String,
        required:true,
        default:'User'
    },
    groups:[GroupSchema]
},{
    timestamps:true,
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
            {_id:this._id,email:this.email,role:this.role,
                status:this.status,isDisable:this.isDisable},
            jwtSecret
        )
    return token;
}


const User = mongoose.model('User', userSchema)

module.exports = User;