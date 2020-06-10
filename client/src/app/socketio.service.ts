import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})

export class SocketioService {

  socket;
  private eventCallback = new Subject<any>(); // Source
  eventCallback$ = this.eventCallback.asObservable(); // Stream

  constructor() { }

  setupSocketConnection() {

    setInterval( () => {
        fetch("https://investors-exchange-iex-trading.p.rapidapi.com/stock/msft/effective-spread", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "investors-exchange-iex-trading.p.rapidapi.com",
                "x-rapidapi-key": "dd7990090emsh91e208725e7aaf7p1ecf83jsn8a99b6a0d8c6"
            }
        })
        .then( response => {
            return response.json();
        })
        .then( jsonResponse => {
            this.eventCallback.next(jsonResponse);
        })
        .catch(err => {
            console.log(err);
        });
    }, 10000)
  }
}
