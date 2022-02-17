import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatappComponent } from './chatapp/chatapp.component';
import { AdmirComponent } from './admir/admir.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'singup',component:SignupComponent},
  {path:'chat',component:ChatappComponent},
  {path:'chat/:group',component:ChatappComponent},
  {path:'admir',component:AdmirComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
