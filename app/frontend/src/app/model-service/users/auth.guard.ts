import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.loginService.currentUserValue;

    if (currentUser) {
        if (currentUser.is_admin) {
          return true;
        } else if (!currentUser.is_admin) {
            this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}