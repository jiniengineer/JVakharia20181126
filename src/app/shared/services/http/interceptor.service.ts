import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class CustomInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
              private spinnerService: Ng4LoadingSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();
    // request = this.addToken(request);
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      },
      catchError((error: any, caught: Observable<HttpEvent<any>>) => {
        const router = this.injector.get(Router);
        if (error.status === 401) {
          // this.auth.credentials = null;
          // router.navigate(['/login']);
          // return of(error);
        } else if (error.status === 404) {
          router.navigate(['/error']);
        }
        return throwError(error);
      })));
  }

  /*
  Add stored auth token to request headers.
  @param HttpRequest<any> request - the intercepted request
  @return HttpRequest<any> - the modified request
  */
  /*private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token: string = this.auth.token;
    if (token) {
      return request.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`,
          },
      });
    }
    return request;
  }*/
}

