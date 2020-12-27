import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionMenuService {

  public actualizarMenuDescktop = new EventEmitter<boolean>();
  public actualizarMenuMovil = new EventEmitter<boolean>();
  public isMobile = new EventEmitter<boolean>();
  constructor() { }
}
