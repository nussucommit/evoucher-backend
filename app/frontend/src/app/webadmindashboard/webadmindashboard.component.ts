import { Organization } from './../model-service/organization/organization';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './../model-service/users/login.service';
import { OrganizationService } from '../model-service/organization/organization.service';

@Component({
  selector: 'app-webadmindashboard',
  templateUrl: './webadmindashboard.component.html',
  styleUrls: ['./webadmindashboard.component.scss']
})
export class WebadmindashboardComponent implements OnInit {

  organizationList: any;
  orgWoUname : any;
  addForm = false;
  addUsernameForm = false;
  showPassword = false;
  orgNameToAdd : string;
  usernameToAdd : string;
  temppassword : string;


  constructor(
    private orgService : OrganizationService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.orgService.getAllOrganization().subscribe(data => {
      console.log(data);
      this.organizationList = data.results;
    });

    this.orgService.getOrgNotYetSignUp().subscribe(data => {
      this.orgWoUname = data;
      console.log(this.orgWoUname);
    });

  }

  turnOnAddForm() {
    this.addForm = this.addForm ? false : true;
    this.addUsernameForm = this.addUsernameForm ? false : false;
  }

  turnOnUsernameForm(orgname : string) {
    this.orgNameToAdd = orgname;
    this.addUsernameForm = this.addUsernameForm ? false : true;
    this.addForm = this.addForm ? false : false;
  }

  updateOrgName(input: any) {
    console.log(this.orgNameToAdd);
    this.orgNameToAdd = input.target.value;
  }

  updateOrgUsername(input: any) {
    this.usernameToAdd = input.target.value;
    console.log(this.usernameToAdd);
  }

  submitNewOrganization() {
    const formData = new FormData();
    const registerUsername = new FormData();
    formData.append('name', this.orgNameToAdd);

    if (this.usernameToAdd) {
      formData.append('username', this.usernameToAdd);
      registerUsername.append('username', this.usernameToAdd);
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var string_length = 8;
      var randomstring = '';
      for (var i=0; i<string_length; i++) {
          var rnum = Math.floor(Math.random() * chars.length);
          randomstring += chars.substring(rnum,rnum+1);
      }
      this.temppassword = randomstring;
      registerUsername.append('password', this.temppassword);
      this.loginService.signup(registerUsername).subscribe();
      this.showPassword = this.showPassword ? false : true;
    }

    if (this.addForm) {
      this.orgService.createOrganization(formData).subscribe();
    }

    if (this.addUsernameForm) {
      this.orgService.patchOrganization(this.orgNameToAdd, formData).subscribe();
    } 
  }

}
