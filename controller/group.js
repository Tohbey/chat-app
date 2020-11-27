const express = require('express')
const router = express.Router()
const _ = require('lodash');
const winston = require('winston');
const {Group} = require('../model/groups');
const User = require('../model/users');

//@desc     getting groups
//router    GET /
router.get('',async(req,res) => {
    const groups = await Group.find()
    res.status(200).json(groups)
})

//@desc     getting groups
//router    GET /
router.get('/groupNames',async(req,res) => {
    const groups = await Group.find()

    let groupNames = new Array();

    groups.forEach(element => {
        groupNames.push(element.groupName)
    })
    res.send(groupNames)
})

router.get('/byName/:groupName',async(req,res) => {
    const groupName = req.params.groupName

    const group = await Group.findOne({groupName:groupName})
    if(!group) return res.status(400).send('Group doesnt not exist')

    res.send(group)
})

//@desc     getting group
//router    GET :/id
router.get(':/id',async(req,res) =>{
    const id = req.params.id;
    
    let group = await Group.findById(id);
    if(!group) return res.status(400).send('Group doesnt not exist')

    res.send(group);
})


//@desc     creating group
//router    POST /
router.post('',async(req,res) => {
    let group = await Group.findOne({groupName:req.body.groupName})
    if(group) return res.status(400).send('Group already exist')

    group = new Group(_.pick(req.body,[
        'groupName','groupDescription','createdBy'
    ]))
    
    let createdByUser = await User.findOne({username:group.createdBy})
    if(!createdByUser) return res.status(400).send('User does not exist')

    group.users.push(createdByUser._id)
    createdByUser.groups.push(group)
    
    try{
        group = await group.save()
        createdByUser = await createdByUser.save()
        winston.info('Group saved')

        res.status(200).send(group)
    }catch(err){
        res.status(400).send(err)
        console.log("Saving users in users.js "+err)
    }  
})

//@desc     adding user to group
//router    GET /
router.get('/addingUser/:id/:userId',async(req,res) => {
    const id = req.params.id;
    const userId = req.params.userId;

    let group = await Group.findById(id)
    if(!group) return res.status(400).send('Group does not exist')
    let creeatedByUser = await User.findOne({username:group.createdBy})

    let user = await User.findById(userId)
    if(!user) return res.status(400).send('User does not exist')
    if(String(userId) === String(creeatedByUser._id)) return res.status(400).send('cant add Admin again')

    let users = group.users
    //check so a user cant be added twice
    let index = users.findIndex(x => String(x._id) === String(userId))
    console.log('index ',index)
    if(index >= 0) return res.status(400).send('User has been added to dis group chat')

    users.push(userId)

    user.groups.push(group)

    console.log('group details ',group)
    console.log('user details ',user)
    
    await user.save();
    group = await group.save();

    res.send(group);
})

module.exports = router