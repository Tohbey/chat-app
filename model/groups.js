const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const groupSchema = mongoose.Schema({
    groupName:{
        type:String,
        required:true,
        minlenght:5,
        maxlenght:50
    },
    groupDescription:{
        type:String,
        required:true,
        minlenght:5,
        maxlenght:150
    },
    createdBy:{
        type:String,
        required:true,
        index:true 
    },
    users:[{
        userId:{
            type:objectId,
            index:true  
        }
    }]
},{
    timestamps:true,
})

const Group = mongoose.model('Group',groupSchema)

exports.Group = Group;
exports.GroupSchema = groupSchema;