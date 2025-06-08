import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private mostrarTarjetas = new BehaviorSubject<boolean>(true);
  mostrarTarjetas$ = this.mostrarTarjetas.asObservable();

  toggleTarjetas(){
    this.mostrarTarjetas.next(!this.mostrarTarjetas.value);
  }

  constructor() { }
}
