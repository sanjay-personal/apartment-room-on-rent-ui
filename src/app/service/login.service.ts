import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  postSignup(req) {
    return this.http.post(this.baseurl+"signup",req)
  }

  getSignup() {
    return this.http.get(this.baseurl+"signup")
  }

  postLogin(req) {
    return this.http.post(this.baseurl+"login",req)
  }

}
