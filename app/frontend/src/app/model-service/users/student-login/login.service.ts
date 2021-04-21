import { environment } from '../../../../environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StudentToken } from './tokens';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentLoginDetail } from './login-details';
import { StudentUser } from './users';
import { Router } from '@angular/router';
import { ComponentBridgingService } from '../../componentbridging.service';

@Injectable({
  providedIn: 'root'
})
export class StudentLoginService {
  private loginApiUrl = environment.backendUrl + 'token';
  private refreshApiUrl = environment.backendUrl + 'token/refresh';

  private errorMessage = 'Cannot read property \'token\' of null';

  private currentUserSubject: BehaviorSubject<StudentUser>;
  public currentUser: Observable<StudentUser>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private bridgingService: ComponentBridgingService
  ) {
    this.currentUserSubject = new BehaviorSubject<StudentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials: StudentLoginDetail) {
    return this.http.post<StudentToken>(this.loginApiUrl, credentials)
      .pipe(
        map<StudentToken, boolean>((receivedToken: StudentToken) => {
          const user = {
            username: credentials.username, //email
            token: receivedToken,
            is_admin: false,
            is_webadmin: false
          };
          this.storeUser(user);
          return true;
        }),
        catchError((error) => this.handleError(error))
      );
  }

  studentLogin(email: string) {
    return this.http.post<StudentToken>(environment.backendUrl + 'studentlogin', { username: email })
      .pipe(map<StudentToken, boolean>((receivedToken: StudentToken) => {
        const user = {
          username: email,
          token: receivedToken,
          is_admin: false,
          is_webadmin: false
        };
        this.storeUser(user);
        return true;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  attachAccessToken(request: HttpRequest<any>): HttpRequest<any> {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token.access}`
        }
      });
    }

    return request;
  }

  refreshAccessToken(): Observable<boolean> {
    const currentUser = this.currentUserValue;

    return this.http.post<StudentToken>(this.refreshApiUrl, currentUser.token)
      .pipe(
        map<StudentToken, boolean>((receivedToken: StudentToken) => {
          //console.log('Before');
          //console.log(this.currentUserValue);
          this.updateAccessToken(receivedToken);
          //console.log('After');
          //console.log(this.currentUserValue);
          return true;
        }),
        catchError((error) => this.handleError(error))
      );
  }

  updateAccessToken(newToken: StudentToken) {
    const currentUser = this.currentUserValue;
    this.currentUserSubject.next({
      username: currentUser.username, //email
      token: {
        access: newToken.access,
        refresh: currentUser.token.refresh,
        is_admin: false,
        is_webadmin: false
      },
      is_admin: false,
      is_webadmin: false
    });
  }

  get observableUser(): Observable<StudentUser> {
    return this.currentUser;
  }

  get currentUserValue(): StudentUser {
    return this.currentUserSubject.value;
  }

  private storeUser(user: StudentUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      this.bridgingService.publish('error');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      if (error.status === 400 || error.status === 401 || error.message === this.errorMessage) {
        this.bridgingService.publish('authfail');
      } else {
        this.bridgingService.publish('error');
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}