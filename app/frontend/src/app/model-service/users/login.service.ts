import { environment } from '../../../environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Token } from './tokens';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetail } from './login-details';
import { User } from './users';
import { Router } from '@angular/router';
import { ComponentBridgingService } from '../componentbridging.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private signUpApiUrl = environment.backendUrl + 'register';
  private changePasswordApiUrl = environment.backendUrl + 'changepassword';
  private loginApiUrl = environment.backendUrl + 'token';
  private refreshApiUrl = environment.backendUrl + 'token/refresh';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private bridgingService: ComponentBridgingService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(credentials: LoginDetail) {
    return this.http.post<Token>(this.loginApiUrl, credentials)
      .pipe(
        map<Token, boolean>((receivedToken: Token) => {
          const user = {
            username: credentials.username,
            token: receivedToken,
            is_admin: true,
            is_webadmin: credentials.username == "commitadmin",
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
    this.router.navigate(['/']);
  }

  signup(user: any): Observable<object> {
    return this.http.post(`${this.signUpApiUrl}` , user);
  }

  changepassword(id:string, user: any) {
    return this.http.post(`${this.changePasswordApiUrl}/${id}`, user);
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

    return this.http.post<Token>(this.refreshApiUrl, currentUser.token)
      .pipe(
        map<Token, boolean>((receivedToken: Token) => {
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

  updateAccessToken(newToken: Token) {
    const currentUser = this.currentUserValue;
    this.currentUserSubject.next({
      username: currentUser.username,
      token: {
        access: newToken.access,
        refresh: currentUser.token.refresh,
        is_admin: true,
        is_webadmin: currentUser.username == "commitadmin"
      },
      is_admin: true,
      is_webadmin: currentUser.username == "commitadmin"
    });
  }

  get observableUser(): Observable<User> {
    return this.currentUser;
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private storeUser(user: User) {
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
      if (error.status === 400 || error.status === 401) {
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