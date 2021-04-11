import { LoginService } from './../model-service/users/login.service';
import { StudentLoginService } from './../model-service/users/student-login/login.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-org-admin-dashboard',
  templateUrl: './org-admin-dashboard.component.html',
  styleUrls: ['./org-admin-dashboard.component.scss']
})
export class OrgAdminDashboardComponent implements OnInit {

  username: string;
  oldpw: string;
  newpw: string;
  confnewpw: string;
  changePasswordForm: FormGroup;
  notmatch = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.username = this.loginService.currentUserValue.username;
    this.changePasswordForm = this.formBuilder.group({
      username: [this.username, Validators.required],
      oldpw: ['',Validators.required],
      newpw:['', Validators.required],
    });
  }
  
  updateConfPw(event) {
    this.confnewpw = event.target.value;
  }

  changePassword() {
    const formdata = new FormData();

    formdata.append('username', this.username);

    if (this.changePasswordForm.value.newpw != this.confnewpw) {
      this.notmatch = true;
      return false;
    } else {
      formdata.append('oldpassword', this.changePasswordForm.value.oldpw);
      formdata.append('newpassword', this.changePasswordForm.value.newpw);
      try {
        this.loginService.changepassword(this.username, formdata).subscribe( data => {
          console.log(data);
        } );
      } catch (err) {
        console.error(err.status);
      }
      
    }

  }

}
