import { Component, OnInit } from '@angular/core';
import { Socket1Service } from '../services/admir-socket/socket-1.service';

@Component({
  selector: 'app-admir',
  templateUrl: './admir.component.html',
  styleUrls: ['./admir.component.scss']
})
export class AdmirComponent implements OnInit {

  constructor(
    private admirSocket: Socket1Service
  ) { }

  ngOnInit(): void {
    this.listen()
  }

  listen(){
    this.admirSocket.socket.on("message",(error, msg, data=null, meta=null) => {
      console.log(error, msg, data, meta)
    })
  }

  newEntry(){
    console.log('New Entry')
    this.admirSocket.newEntry();
  }

  listOfEntries(){
    console.log('List of Entries')
    this.admirSocket.getEntries();
  }

  getSingle(){
    console.log('Single Entry')
    this.admirSocket.getEntry()
  }

  disconnect(){
    console.log('Disconnect')
    this.admirSocket.disconnect()
  }
}
