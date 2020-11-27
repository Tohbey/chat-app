import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {  User } from '../../models/users'



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  getUsers():Observable<User>{
    return this.http.get<User>(this.userUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUserById(id):Observable<User>{
    return this.http.get<User>(this.userUrl + "/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUserByUsername(username):Observable<User>{
    return this.http.get<User>(this.userUrl+"/byUsername/"+username)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUserByEmail(email):Observable<User>{
    return this.http.get<User>(this.userUrl+"/byEmail/"+email)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  createUser(user:User):Observable<User>{
    return this.http.post<any>(this.userUrl,user,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  update(user:User,id):Observable<User>{
    return this.http.put<User>(this.userUrl+"/"+id,user,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUserByGroups(id):Observable<User>{
    return this.http.get<User>(this.userUrl+"/userGroup/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Error Handling
  handleError(error){
    let errorMessage="";
     if(error.error instanceof ErrorEvent){
         //Get client-side error
          errorMessage = error.error.message;
        }else{
          //get serve-side error
          errorMessage = 'Error Code: $(error.status)\n Message:$(error.message)'
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
  }
}
