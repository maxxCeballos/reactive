import { Component, OnInit } from '@angular/core';
import { SocketioService } from './socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  conversacion: Array<any> = [];

  constructor(
    private socketService: SocketioService
  ) {}

  ngOnInit() {
    this.socketService.setupSocketPython('python');

    this.socketService.eventCallback$.subscribe( data => {
      let mensaje = {
        usuario : data.user,
        mensaje : data.mensaje
      }
      this.conversacion.push(mensaje);
    });

    
  }

}