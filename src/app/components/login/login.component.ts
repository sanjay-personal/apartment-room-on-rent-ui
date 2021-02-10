import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/classes/login';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login = new Login(null,null)
  apartmentNames = []

  constructor(private loginService: LoginService , private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.loadApartments()
  }

  onSubmit(form: NgForm,e) {
    if (form.invalid) {
      return;
    }
    this.loginService.postLogin(this.login).subscribe(res=>{
      console.log(res['status'].code,res['status'].message,res)
      if(res['status'].code === 'ERROR') {
        alert(res['status'].message)
      }
      this.authservice.setToken(res['token'])
      this.authservice.loginStateChanged()
      this.router.navigate([""])
    })
  }

  loadApartments() {
    this.loginService.getSignup().subscribe(res=>{
      this.apartmentNames = res['primary']
      console.log("apartmentNames",this.apartmentNames)
    })
  }

}
