import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../../models/message';
import { Injectable } from '@angular/core';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, retry, subscribeOn } from 'rxjs/operators';
import  {io} from 'socket.io-client';
import { APIs } from '../APIs';


@Injectable()

export class SocketService {

  private message:Message
  // private socket = io('');
  public socket = io(APIs.mainUrl,{
    path:"/sio",
    transports:["websocket"]
  });

  constructor(private http: HttpClient) {
    this.socket.on("connect",() => {
      console.log("connected")
    })
  }

  listen(){
    this.socket.on("message",(message) => {
      console.log(message)
    })
  }

  emit(eventName:string,message,username,groupName){
    this.socket.emit(eventName,username,message,groupName)
  }

  // disconnect(){

  // }
}
