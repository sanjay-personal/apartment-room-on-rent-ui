import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('Token')
    sessionStorage.removeItem('userdetails')
    this.authservice.loginStateChanged()
    this.router.navigate(['login'])

  }

}
