import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Injectable } from '@angular/core';


@Injectable()
export class Token implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        const dis = this;
        if (this.authService.getToken() !== null) {
          const header = new HttpHeaders({ 'Authorization': 'bearer ' + this.authService.getTokenStorage()});
          // console.log("$$header",header)
          const duplicate = req.clone({ headers: header });
          // console.log("$$duplicate",duplicate)
          // console.log("$$req.clone({ headers: header })",req.clone({ headers: header }))
          return next.handle(duplicate);
        }
    
        return next.handle(req);
    }

    
}
