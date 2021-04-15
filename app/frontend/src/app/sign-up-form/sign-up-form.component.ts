import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../model-service/organization/organization.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  notSignUpOrganization: any;

  constructor(
    private organizationService: OrganizationService
  ) { }

  ngOnInit(): void {
    
    this.organizationService.getOrgNotYetSignUp().subscribe( data => {
      this.notSignUpOrganization = data;
      console.log("haha")
      console.log(data);
    })
  }

  

}
