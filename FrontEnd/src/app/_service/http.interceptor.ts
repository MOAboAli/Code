import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TokenaccountService } from '../components/user/_services/tokenaccount.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: TokenaccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.auth.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', "Bearer " + authToken!)
    });

    return next.handle(authReq);
  }
}