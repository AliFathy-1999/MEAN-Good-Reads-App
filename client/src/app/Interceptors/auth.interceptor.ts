import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SpinerService } from '../core/spiner/spiner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private spinnerService: SpinerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.authService.getToken();
    if (myToken) {
      const modifiedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${myToken}`),
      });
      return next.handle(modifiedRequest).pipe(
        tap((response) => {
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
    }
 
    return next.handle(request);
  }
}
