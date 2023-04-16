import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SpinerService } from '../core/spiner/spiner.service';

@Injectable()
export class ErorrsHandlerInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private spinnerService: SpinerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      request.url.endsWith('/register') ||
      request.url.endsWith('/user') ||
      request.url.endsWith('/books') ||
      request.url.endsWith('/user/authors')||
      request.url.endsWith('/categories')
    ) {
      this.spinnerService.requestStarted();
    }

    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.requestEnded();
          }
        },
        (error: HttpErrorResponse) => {
          this.spinnerService.resetSpinner();
        }
      )
    );
  }
}


