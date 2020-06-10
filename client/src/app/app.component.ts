import { Component, OnInit } from '@angular/core';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  data: any = {}

  constructor(
    private socketService: SocketioService
  ) {}

  ngOnInit() {

    this.socketService.eventCallback$.subscribe( data => {
        console.log('la data ', data)
        this.data = data;
    });

    this.socketService.setupSocketConnection();
    
  }

}