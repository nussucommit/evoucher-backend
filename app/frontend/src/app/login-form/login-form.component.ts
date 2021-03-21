import { LoginService } from './../model-service/users/login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComponentBridgingService } from '../model-service/componentbridging.service';

/**
 * Component for login page.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  returnUrl: string;

  hide = true;

  errorString: string;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  errorSubscription: Subscription;
  authfailSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private bridgingService: ComponentBridgingService
  ) {
    // console.log(loginService.currentUserValue);
  }

  /**
   * Initializes the behaviour when the user failed to login and the page to redirect to once the user successfully logs in.
   */
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.errorSubscription = this.bridgingService.on('error').subscribe(() => {this.setErrorString("An unknown error occured.")});
    this.authfailSubscription = this.bridgingService.on('authfail').subscribe(() => {this.setErrorString("Your username or password is incorrect.")});
  }

  /**
   * Unsubscribe the changes.
   */
  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.authfailSubscription.unsubscribe();
  }

  /**
   * Obtain the inputted credentials.
   */
  get form() {
    return this.loginForm.controls;
  }

  /**
   * Sets the error string.
   * @param str Error string.
   */
  setErrorString(str: string) {
    this.errorString = str;
  }

  /**
   * If the credentials are valid, redirect the user to the correct page.
   */
  onSubmit(): void {
    this.loginService.login({
      username: this.form.username.value,
      password: this.form.password.value
    })
      .subscribe((status: boolean) => {
        if (status) {
          this.router.navigate([this.returnUrl]);
        }
      });
  }

}