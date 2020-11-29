import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models/users';
import { APIs } from './APIs';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authUrl = APIs.authUrl;

  constructor(private http: HttpClient,private userService:UsersService) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  authentication(email,password):Observable<any>{
    return this.http.post<any>(this.authUrl,{email,password},this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getToken():String{
    return sessionStorage.getItem('x-auth-token')
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
