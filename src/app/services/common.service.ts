import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  @Output() loginEvent = new EventEmitter<boolean>();
  constructor() { }

  Login(login: boolean) {
    this.loginEvent.emit(login);
  }
}
