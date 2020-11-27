import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false
  currentUser:User;
  groups
  group
  constructor(private formBuilder: FormBuilder
    ,private router: Router,private authService:AuthService,
    private userService:UsersService) {
    this.login()
  }

  ngOnInit(): void {
  }

  login(){
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  chatRoom(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return
    }
    console.log(this.loginForm.value)
    let email = this.loginForm.get('email').value
    let password = this.loginForm.get('password').value

    this.authService.authentication(email,password).subscribe(
      data => {
        console.log(data)
        localStorage.setItem('x-auth-token',data)
        this.getUserDetails(email)
      }
    )
  }
  getUserDetails(email){
    let resp = this.userService.getUserByEmail(email)
    resp.subscribe((data) => {
      console.log(data)
      this.currentUser = data
      this.getUserGroups(this.currentUser._id)
    })
  }

  getUserGroups(id){
    let resp = this.userService.getUserByGroups(id)
    resp.subscribe((data) => {
      this.groups = data
      this.group = this.groups[0]
      console.log(this.group)
      this.router.navigate(['/chat',this.group])
      console.log(this.groups)
    })
  }

  signUp(){
    this.router.navigate(['/singup'])
  }
}
