import { Component } from '@angular/core';
import { StudentLoginService } from './model-service/users/student-login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public loginService: StudentLoginService
  ) { }

  show = this.loginService.currentUserValue != null && this.loginService.currentUserValue.is_admin;
  title = 'frontend';
}
