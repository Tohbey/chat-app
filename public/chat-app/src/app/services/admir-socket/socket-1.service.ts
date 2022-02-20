import { Injectable } from '@angular/core';
import  {io} from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Socket1Service {

  API = "http://localhost:3000";
  body = {
    location:{
      lat: 6.8,
      long: 7.0 
    }
  };

  staff = {
    _id: '61dd6cdf33248a92029184ea'
  }

  entryId = '6212bbeb7c46397fec10846b'

  public socket = io(this.API, {
    path:"/sio",
    transports:["websocket"]
  })

  constructor(private http:HttpClient) {
    let id = this.staff._id; 
    this.socket.on('connect', () => {
      console.log("connected")
    });

    this.connection()
  }

  listen(){
    this.socket.on('message',(msg, data, meta) => {
      console.log(msg, data, meta)
    })
  }

  connection(){
    this.socket.emit('login', this.staff._id)
  }

  newEntry(){
    console.log(this.body, this.staff)
    this.socket.emit('newEntry',this.body,this.staff)
  }

  getEntries(){
    this.socket.emit('listenToEntryByAdmin')
  }

  getEntry(){
    this.socket.emit('listenToSingleEntryByAdmin', this.entryId)
  }

  disconnect(){
    this.socket.emit('leave',this.staff)
  }
}
