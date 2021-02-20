import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as moment from 'moment';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  userDetails: any;
  ApartmentName: any;
  monthWise: any

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.monthWise = moment(new Date()).format('MMMM')
    this.userDetails  = this.authservice.getLoggedUserDetails()
    this.ApartmentName = this.userDetails['ApartmentName']
  }

  logout() {
    sessionStorage.removeItem('Token')
    sessionStorage.removeItem('userdetails')
    this.authservice.loginStateChanged()
    this.router.navigate(['login'])

  }

}
