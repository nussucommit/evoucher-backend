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
  hideold = true;
  hidenew = true;
  hideconf = true;
  falseOldPassword = false;
  success = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) { }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }  

  ngOnInit(): void {
    this.username = this.loginService.currentUserValue.username;
    this.changePasswordForm = this.formBuilder.group({
      username: [this.username, Validators.required],
      oldpw: ['',Validators.required],
      newpw:['', Validators.required],
      confpw:['', Validators.required]
    }, {
      validator: this.MustMatch('newpw', 'confpw')
    });
  }

  changePassword() {
    const formdata = new FormData();

    formdata.append('old_password', this.changePasswordForm.value.oldpw);
    formdata.append('new_password1', this.changePasswordForm.value.newpw);
    formdata.append('new_password2', this.changePasswordForm.value.confpw);
    this.loginService.changepassword(this.username, formdata).subscribe( 
      (data) => {
      console.log(data);
      this.success = true;
      this.falseOldPassword = false;
    },
      (error) => {
        console.log(error);
        this.falseOldPassword = true;
      }
    );

  }

}
