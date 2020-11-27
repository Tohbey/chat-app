import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket
  private socketUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {

  }
  createConnection(){
    this.socket = io.connect(this.socketUrl);
    console.log(this.socket)
  }
  
}
