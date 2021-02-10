import { Component, OnInit } from '@angular/core';
import { Signup } from 'src/app/classes/signup';
import { LoginService } from 'src/app/service/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  model: Signup = new Signup()

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm,e) {
    console.log("form",form)
    if (form.invalid) {
      return;
    }
    console.log("this.signup",this.model)
    this.loginService.postSignup(this.model).subscribe(res=>{
      alert(res['status'].message)
      this.router.navigate(["/login"])
    })
  }
}
