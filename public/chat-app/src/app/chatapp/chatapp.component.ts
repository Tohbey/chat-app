import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { disconnect } from 'process';
import { Group } from '../models/groups';
import { Message } from '../models/message';
import { User } from '../models/users';
import { AuthService } from '../services/auth.service';
import { GroupsService } from '../services/groups/groups.service';
import { SocketService } from '../services/socket/socket.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.scss']
})
export class ChatappComponent implements OnInit {

  chatForm:FormGroup
  groupForm:FormGroup
  joinGroup:FormGroup
  user:User
  groupInput:Group
  username
  groupNames:any
  groups
  groupDetail:Group;
  ListOfUsers = new Array();
  submitted =false
  submitted1 = false
  submitted2 = false
  message:any
  currentGroup
  constructor(
    private socketService:SocketService,
    private formBuilder:FormBuilder,
    private userService:UsersService,
    private groupService:GroupsService,
    private router:Router,
    private activatedRoute: ActivatedRoute) {
      this.chat()
      this.group()
      this.join()
    }

  ngOnInit(): void {
    this.getUser()
    this.getUserGroups()
    this.currentGroup = this.activatedRoute.snapshot.url[1].path
    this.listen()
    this.getList(this.currentGroup)
    this.getgroupNames()
  }

  listen(){
    this.socketService.socket.on("message",(message) => {
      console.log(message)
      this.outputMessage(message)
    })
  }
  joinRoom(username,room){
    this.socketService.socket.emit('joinRoom',{username,room})
  }

  chat(){
    this.chatForm = this.formBuilder.group({
      chat:['',Validators.required]
    })
  }

  group(){
    this.groupForm = this.formBuilder.group({
      groupName:['',Validators.required],
      groupDescription:['',Validators.required],
      createdBy:['',Validators.required]
    })
  }

  join(){
    this.joinGroup = this.formBuilder.group({
      group:['',Validators.required]
    })
  }

  get f(){
    return this.chatForm.controls;
  }

  get g(){
    return this.groupForm.controls;
  }

  get j(){
    return this.joinGroup.controls;
  }

  getgroupNames(){
    let resp = this.groupService.getGroupNames();
    resp.subscribe((data) => {
      this.groupNames = data
      console.log('Groups ',this.groupNames)
    })
  }

  joinChat(){
    this.submitted2 = true
    if(this.joinGroup.invalid){
      return
    }
    let groupName = this.joinGroup.get('group').value
    let resp = this.groupService.getGroupByName(groupName)
    resp.subscribe((data) => {
      console.log(data)
      this.addingUser(data._id,this.user._id)
    })
  }

  addingUser(groupId,userId){
    let resp = this.groupService.addingUser(groupId,userId)
    resp.subscribe((data) => {
      console.log(data)
    })
  }

  exitChat(){
    this.socketService.socket.emit('leave',this.username,this.currentGroup)
    this.router.navigate(['/login'])
  }

  addGroup(){
    document.getElementById('join').style.display = 'block'
  }

  createGroup(){
    this.submitted1 = true;
    if(this.groupForm.invalid){
      return
    }
    console.log(this.groupForm.value)
    this.groupInput = this.groupForm.value
    let resp  = this.groupService.createGroup(this.groupInput)
    resp.subscribe((data) => {
      this.getUserGroups()
      console.log(data)
    })
  }

  displayForm(){
    document.getElementById('container').style.display = 'block'
  }

  postChat(){
    this.submitted= true
    if(this.chatForm.invalid){
      return
    }
    const chat = this.chatForm.get('chat').value;
    this.socketService.emit('chatMessage',chat,this.username,this.currentGroup)
    this.chatForm.reset()
  }

  outputMessage(message:Message){
    let div = document.createElement('div')
    div.classList.add('message');
    div.style.padding = '10px';
    div.style.marginBottom = '10px'
    div.style.backgroundColor = '#e6e9ff'
    div.style.borderRadius = '5px'
    div.style.overflowWrap = 'breal-word'
    div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
    <small>from ${message.groupName}</small>`;
    document.querySelector('.chat-messages').appendChild(div);
  }

  getUser(){
    const data = localStorage.getItem('user-id')
    let resp = this.userService.getUserById(data)
    resp.subscribe((data) => {
      this.user = data
      this.username = this.user.username;
      this.groupForm.patchValue({createdBy:this.username})
      this.joinRoom(this.user.username,this.currentGroup)
      console.log(this.user)
    })
  }

  getList(groupName){
    let resp = this.groupService.getGroupByName(groupName)
    resp.subscribe((data) => {
      this.groupDetail = data
      console.log(this.groupDetail.users)
      this.getListOfUsers(this.groupDetail.users,this.groupDetail.users.length)
    })
  }

  getListOfUsers(list,lenght){
    for(let i=0;i<lenght;i++){
      let resp = this.userService.getUserById(list[0]._id)
      resp.subscribe((data) => {
        let user:User = data
        this.ListOfUsers.push(user.username)
        console.log(this.ListOfUsers)
      })
    }
  }

  getUserGroups(){
    const data = localStorage.getItem('user-id')
    let resp = this.userService.getUserByGroups(data)
    resp.subscribe((data) => {
      this.groups = data
      console.log(this.groups)
    })
  }
}
