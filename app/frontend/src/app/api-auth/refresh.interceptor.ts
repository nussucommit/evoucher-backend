import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { LoginService } from './../model-service/users/login.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private loginService: LoginService,
    private snackbar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status != 401) {
            return throwError(error);
          }

          if (this.isAuthRequest(request)) {
            if (this.isRefreshRequest(request)) {
              this.loginService.logout();
            }

            return throwError(error);
          }

          if (this.isRefreshing) {
            return this.waitForToken(request, next);
          } else {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.refresh(request, next);
          }
        })
      );
  }

  private refresh(request: HttpRequest<any>, next: HttpHandler) {
    return this.loginService.refreshAccessToken().pipe(
      switchMap((state: boolean) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(state);

        return next.handle(this.loginService.attachAccessToken(request));
      }),
      catchError(err => {
        this.isRefreshing = false;
        this.loginService.logout();
        return throwError(err);
      })
    );
  }

  private waitForToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.refreshTokenSubject.pipe(
      filter(result => result !== null),
      take(1),
      switchMap(() => next.handle(this.loginService.attachAccessToken(request)))
    );
  }

  private isAuthRequest(request: HttpRequest<any>): boolean {
    return request.url.includes('token');
  }

  private isRefreshRequest(request: HttpRequest<any>): boolean {
    return request.url.includes('refresh');
  }
}