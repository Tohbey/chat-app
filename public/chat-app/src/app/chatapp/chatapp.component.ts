import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../models/groups';
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

  private socket
  chatForm:FormGroup
  groupForm:FormGroup
  user:User
  groupInput:Group
  username
  groups
  submitted =false
  submitted1 = false
  constructor(
    private socketService:SocketService,
    private formBuilder:FormBuilder,
    private userService:UsersService,
    private authentication:AuthService,
    private groupService:GroupsService,
    private router:Router) {
      this.chat()
      this.group()
    }

  ngOnInit(): void {
    this.getUser()
    this.getUserGroups()
    // this.socketService.createConnection()
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

  get g(){
    return this.groupForm.controls;
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

  openPage(url,groupName){
    this.router.navigate([url,groupName])
  }

  get f(){
    return this.chatForm.controls;
  }

  postChat(){
    this.submitted= true
    if(this.chatForm.invalid){
      return
    }
    console.log(this.chatForm.value)
  }

  getUser(){
    const data = localStorage.getItem('user-id')
    console.log(data)
    let resp = this.userService.getUserById(data)
    resp.subscribe((data) => {
      this.user = data
      this.username = this.user.username;
      this.groupForm.patchValue({createdBy:this.username})
      console.log(this.user)
    })
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
