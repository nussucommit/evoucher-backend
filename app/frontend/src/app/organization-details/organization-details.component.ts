import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from './../model-service/organization/organization.service';
import { LoginService } from './../model-service/users/login.service';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit {

  voucher: any;
  orgForm: FormGroup;
  
  hasData: boolean;
  todayDate:Date = new Date();

  imageToUpload: any;
  fileToUpload: any;
  emailListToUpload: any;
  codeListToUpload: any;
  orgName : string;
  temppassword : string;
  showPassword = false;

  constructor(
    public dialogRef: MatDialogRef<OrganizationDetailsComponent>,
    //@Inject(MAT_DIALOG_DATA) public voucherData: any,
    public formBuilder: FormBuilder,
    private orgService: OrganizationService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    //this.voucher = this.voucherData.voucher;

    //this.hasData = this.voucher ? true : false;

    //this.orgName = this.voucherData.orgname;
    
    this.orgForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required]
    });
    
  }


  getDialogTitle() {
    //if (this.voucherData.mode === 'create') {
      return 'Create Organization';
    // }  else if (this.voucherData.mode === 'edit') {
    //   return 'Edit Voucher';
  }


  // onSubmit() {
  //   this.dialogRef.close();
  //   const data = this.orgForm.value;
  //   data.posted_date = this.todayDate;
  //   data.counter = 0;
  //   this.orgService.createVoucher(this.toFormData(data)).subscribe();
  // }

  submitNewOrganization() {
    //this.dialogRef.close();
    const formData = new FormData();
    const registerUsername = new FormData();
    formData.append('name', this.orgForm.value.name);

    //if (this.usernameToAdd) {
    formData.append('username', this.orgForm.value.username);
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
    //}

    //if (this.addForm) {
    this.orgService.createOrganization(formData).subscribe();
    //}

    // if (this.addUsernameForm) {
    //   this.orgService.patchOrganization(this.orgNameToAdd, formData).subscribe();
    // } 
  }

  onDelete() {
    this.dialogRef.close({delete: true});
  }

 
}
