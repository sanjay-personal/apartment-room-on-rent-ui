import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseurl = 'http://localhost:8080/api/'
  constructor() { }
}
