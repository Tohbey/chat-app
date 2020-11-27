const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const _ = require('lodash');
const winston = require('winston');
const User = require('../model/users');
const { Group } = require('../model/groups');

//@desc     getting users
//router    GET /
router.get('',async(req,res) => {
    const users = await User.find()
    res.status(200).json(users)
})

//@desc     getting user
//router    GET :/id
router.get('/:id',async(req,res) =>{
    const id = req.params.id;
    
    let user = await User.findById(id);
    if(!user) return res.status(400).send('User doesnt not exist')

    res.send(user);
})

//@desc     getting user
//router    GET :/username
router.get('/byUsername/:username',async(req,res) =>{
    const username = req.params.username;
    
    let user = await User.findOne({username:username});
    if(!user) return res.status(400).send('User doesnt not exist')

    res.send(user);
})

//@desc     getting user
//router    GET :/username
router.get('/byEmail/:email',async(req,res) =>{
    const email = req.params.email;
    
    let user = await User.findOne({email:email});
    if(!user) return res.status(400).send('User doesnt not exist')

    res.send(user);
})

//@desc     creating user
//router    POST /
router.post('',async(req,res) => {
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send('Email already exist')

    user = await User.findOne({username:req.body.username})
    if(user) return res.status(400).send('username already exist')

    let salt = 10;

    user = new User(_.pick(req.body,[
        'firstName','lastName','email','password',
        'address','phoneNumber','bio','username','group'
    ]))
    
    console.log(user)
    const group = await Group.findOne({groupName:user.group})
    if(!group) return res.status(400).send('group not found')

    user.groups.push(group)

    user.password = await bcrypt.hash(user.password,salt)

    try{
        user = await user.save()
        winston.info('User saved')

        const token = user.generateAuthToken()

        res.header('x-auth-token',token).send(_.pick(user,['email','username']))
    }catch(err){
        res.status(400).send(err)
        console.log("Saving users in users.js "+err)
    }  
})

//@desc     updating user
//router    PUT /:id
router.put('/:id',async(req,res) => {
    const id = req.params.id;
    let user = await User.findById(id);
    if(!user) return res.status(400).send('User doesnt not exist')

    const salt = await bcrypt.genSalt(10)

    user.set(_.pick(req.body,[
        'surname','othernames','email',
        'address','phoneNumber','bio','username'
    ]))

    user.password = await bcrypt(user.password,salt)

    try{
        user = await user.save()
        res.send(user)
    }catch(err){
        res.status(400).send(err.errors)
    }
})

//@desc     getting user's groups
//router    GET userGroup/:id
router.get('/userGroup/:id',async(req,res) => {
    const id = req.params.id;
    let user = await User.findById(id);
    if(!user) return res.status(400).send('User doesnt not exist')

    let userGroup = user.groups

    let groupNames = new Array();

    userGroup.forEach(element => {
        groupNames.push(element.groupName)
    })

    res.send(groupNames)
})

module.exports = router