import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { SpinerService } from '../core/spiner/spiner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private spinnerService: SpinerService) {}
  // headers: request.headers.set('Authorization', myToken),      

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      const modifiedRequest = request.clone({
        withCredentials: true,
      });
      console.log(modifiedRequest, next);
      return next.handle(request).pipe(
        tap((response) => {
          console.log(response);
        }),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
    // }
    // console.log(request, next);

    // return next.handle(request);
  }
}
