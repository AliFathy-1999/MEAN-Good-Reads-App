import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErorrsHandlerInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error): Observable<HttpEvent<any>> => {
        console.log(error);
        if (error.error && error.error.err === 'Bio must be between 30 and 300 characters') {
          alert('Bio must be between 30 and 300 characters');
        } else if (
          error.error &&
          error.error.err === 'Date of birth is invalid, Author Birth date year must be less than 2010'
        ) {
          alert('Date of birth is invalid, Author Birth date year must be less than 2010');
        } else {
          // Handle other errors
        }
        return throwError(error);
      })
    );
  }
}
