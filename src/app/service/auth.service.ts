import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private token: any
  public loginState = new Subject();

  setToken(token) {
    console.log("tokennn",token)
    this.token = token;
    this.loginStateChanged();
    sessionStorage.setItem("Token", token);
  }

  getToken() {
    return this.token
  }

  getTokenStorage() {
   return   sessionStorage.getItem("Token")
  }

  getLoggedIn() {
    console.log("storageee",sessionStorage.getItem("Token"))
    if(sessionStorage.getItem("Token") !== undefined && sessionStorage.getItem("Token") !== null && sessionStorage.getItem("Token") !== 'undefined') {
      return true
    } 
    else {
      return false
    }
  }



  loginStateChanged() {
    this.loginState.next();
  }



}
