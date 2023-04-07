import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {
  constructor(private _auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  const myToken=this._auth.getToken();
  let token = request.clone({
  setHeaders:{
  Authorization:`Bearer ${myToken}`
}
    })
    return next.handle(token);
  }
}
