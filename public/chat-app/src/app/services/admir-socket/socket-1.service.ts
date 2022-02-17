import { Injectable } from '@angular/core';
import  {io} from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class Socket1Service {

  API = "http://localhost:3000";
  body = {
    status: 'online',
    location:{
      lat: 6.8,
      long: 7.0 
    }
  };

  staff = {
    _id: '61dc97b190545d02895c7721'
  }

  entryId = '620def3ac23116451bf18ad4'

  public socket = io(this.API, {
    path:"/sio",
    transports:["websocket"]
  })

  constructor(private http:HttpClient) { 
    this.socket.on('connect', () => {
      console.log("connected")
    })
  }

  listen(){
    this.socket.on('message',(msg, data, meta) => {
      console.log(msg, data, meta)
    })
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
