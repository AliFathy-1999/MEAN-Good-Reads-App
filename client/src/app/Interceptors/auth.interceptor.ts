import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.authService.getToken();
    if (myToken) {
      const Modifiedrequest = request.clone({
        headers: request.headers.set('Authorization', myToken),
      });
      console.log(Modifiedrequest, next);
      return next.handle(Modifiedrequest);
    }
    console.log(request, next);

    return next.handle(request);
  }
}
