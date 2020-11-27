import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Group } from 'src/app/models/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private groupUrl = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  }

  getGroups():Observable<Group>{
    return this.http.get<Group>(this.groupUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getGroupNames():Observable<Group>{
    return this.http.get<Group>(this.groupUrl+"/groupNames")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getGroupByName(groupName):Observable<Group>{
    return this.http.get<Group>(this.groupUrl+"/byName/"+groupName)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getGroupById(id):Observable<Group>{
    return this.http.get<Group>(this.groupUrl+"/"+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createGroup(group:Group):Observable<Group>{
    return this.http.post<Group>(this.groupUrl,group,this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  addingUser(id,userId):Observable<Group>{
    return this.http.get<Group>(this.groupUrl+"/addingUser"+id+userId)
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
