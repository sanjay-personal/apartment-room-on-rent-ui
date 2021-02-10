import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appLogin]'
})
export class LoginDirective {

  constructor(private authservice:AuthService, private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,private router: Router) { }

  @Input() set appLogin(obj: any) {
    const dis = this;
    dis.authservice.loginState.subscribe(a => {
      const isLoggedIn = dis.authservice.getLoggedIn();
      console.log("isLoggedIn",isLoggedIn)
    if (!isLoggedIn) {
      this.viewContainer.clear();
      this.router.navigate(['login'])
      return;
    }
    this.viewContainer.createEmbeddedView(this.templateRef);
    })
    const isLoggedIn = this.authservice.getLoggedIn();
    console.log("isLoggedInisLoggedIn22",isLoggedIn)
    if (!isLoggedIn) {
      this.viewContainer.clear();
      this.router.navigate(['login'])
      return;
    }
    this.viewContainer.createEmbeddedView(this.templateRef);

    // this.router.navigate(['signup'])
  }


}
