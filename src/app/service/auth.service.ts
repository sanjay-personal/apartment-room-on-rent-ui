import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private token: any
  public loginState = new Subject();

  private userdetails: any

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
    if(sessionStorage.getItem("Token") !== undefined && sessionStorage.getItem("Token") !== null) {
      return true
    } 
    else {
      return false
    }
  }

  getLoggedUserDetails() {
     return JSON.parse(sessionStorage.getItem("userdetails"))
  }

  setLoggedUserDetails(userdetails:any) {
    this.userdetails =  userdetails
    sessionStorage.setItem("userdetails", JSON.stringify(userdetails));

  }



  loginStateChanged() {
    this.loginState.next();
  }



}
