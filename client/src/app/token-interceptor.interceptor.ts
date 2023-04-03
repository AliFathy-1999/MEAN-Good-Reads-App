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
// static accessToken=''
  constructor(private _auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  let token = request.clone({
  setHeaders:{
  Authorization:`Bearer ${this._auth.getToken()}`
  // Authorization:`Bearer ${TokenInterceptorInterceptor.accessToken}`

}
    })
    return next.handle(token);
  }
}
