import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../models/groups';
import { User } from '../models/users';
import { GroupsService } from '../services/groups/groups.service';
import { SocketService } from '../services/socket/socket.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup;
  submitted = false
  groupNames:any
  user:User;

  constructor(private formBuilder: FormBuilder,
    private router: Router,private groupService:GroupsService,
    private userService:UsersService) {
    this.signUp()
  }
  ngOnInit(): void {
    this.getgroupNames()
  }

  get f(){
    return this.signUpForm.controls;
  }

  signUp(){
    this.signUpForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      phoneNumber:['',Validators.required],
      bio:['',Validators.required],
      group:['',Validators.required]
    })
  }

  getgroupNames(){
    let resp = this.groupService.getGroupNames();
    resp.subscribe((data) => {
      this.groupNames = data
      console.log('Groups ',this.groupNames)
    })
  }

  register(){
    console.log('click')
    this.submitted = true;
    if(this.signUpForm.invalid){
      return
    }
    this.user = this.signUpForm.value
    console.log(this.user)
    let resp = this.userService.createUser(this.user)
    resp.subscribe((data) => {
      console.log(data)
      this.router.navigate(['/chat'])
    })
  }
}
