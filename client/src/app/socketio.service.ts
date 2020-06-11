import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketioService {

  socket;
  private eventCallback = new Subject<any>(); // Source
  eventCallback$ = this.eventCallback.asObservable(); // Stream

  constructor() {} 

  setupSocketPython(sala) {
    this.socket = io(`${environment.SOCKET_ENDPOINT}/${sala}`);

    this.socket.on('chat-message', (data: any) => {

      this.eventCallback.next(data);

      return 0;
      
    });

  }


  // setupSocketJavascript(id) {
  //   this.socket = io(environment.SOCKET_ENDPOINT);

  //   this.socket.on('js-message', (data: any) => {

  //     if (data.message == id ) {

  //       this.eventCallback.next(data);
        
  //     }

  //     return 0
      
  //   });
  // }


  // este deberia mandar mensajes al servidor para ser transmitido a todos los clientes conectados a la sala
  enviarMensaje(data) {
    this.socket.emit('mensaje', data);
  }
}
