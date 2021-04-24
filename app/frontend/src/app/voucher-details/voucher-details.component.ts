import { OrganizationService } from './../model-service/organization/organization.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.scss']
})
export class VoucherDetailsComponent implements OnInit {

  voucher: any;
  voucherForm: FormGroup;

  hasData: boolean;
  todayDate: Date = new Date();

  imageToUpload: any;
  fileToUpload: any;
  emailListToUpload: any;
  codeListToUpload: any;
  orgName: string;

  codeArr: string[];
  emailArr: string[];

  numCode: any;
  numEmail: any;

  enoughCode: any;

  constructor(
    public dialogRef: MatDialogRef<VoucherDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public voucherData: any,
    public formBuilder: FormBuilder,
    public voucherService: VoucherService,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.voucher = this.voucherData.voucher;

    this.hasData = this.voucher ? true : false;

    this.orgName = this.voucherData.orgname;

    this.voucherForm = this.formBuilder.group({
      available_date: [this.voucher ? this.voucher.available_date : '', Validators.required],
      expiry_date: [this.voucher ? this.voucher.expiry_date : '', Validators.required],
      organization: [this.orgName, Validators.required],
      voucher_type: [this.voucher ? this.voucher.voucher_type : '', Validators.required],
      name: [this.voucher ? this.voucher.name : '', Validators.required],
      description: [this.voucher ? this.voucher.description : '', Validators.required],
      image: [''],
      code_list: [''],
      email_list: [''],
    });

    this.setFileValidators();
  }

  imageCheck(control: AbstractControl) {
    return new RegExp('.+\.(png|PNG|jpg|jpeg|JPG|JPEG)$').test(control.value) || control.value == '' ? null : { image: true };
  }

  codeCheck(control: AbstractControl) {
    return new RegExp('.+\.csv$').test(control.value) || control.value == '' ? null : { code_list: true };
  }

  emailCheck(control: AbstractControl): any {
    return new RegExp('.+\.csv').test(control.value) || control.value == '' ? null : { email_list: true };
  }

  getDialogTitle() {
    if (this.voucherData.mode === 'create') {
      return 'Create Voucher';
    } else if (this.voucherData.mode === 'edit') {
      return 'Edit Voucher';
    }
  }

  setFileValidators() {
    if (this.voucherData.mode == "create") {
      this.voucherForm.get('image').setValidators([this.imageCheck]);
    } else {
      this.voucherForm.get('code_list').setValidators([this.codeCheck]);
      this.voucherForm.get('email_list').setValidators([this.emailCheck]);
    }
  }

  async onSubmit() {
    this.dialogRef.close();
    const data = this.voucherForm.value;
    data.posted_date = this.todayDate;
    data.counter = 0;
    if (this.voucherData.mode === 'create') {
      this.voucherService.createVoucher(this.toFormData(data)).subscribe();

    } else if (this.voucherData.mode === 'edit') {
      //const remainingCode = await this.getNumCodes(this.voucherData.voucher.id);

      /*const temp = await this.getNumCodes(this.voucherData.voucher.id);
      console.log("WKWKWK" + temp);
      const temp = await this.getNumCodeList(this.codeListToUpload);
      console.log("WKWKWK" + temp);
      this.getNumCodes(this.voucherData.voucher.id);
      console.log("WKKWKWKW" + this.numCode);
      //console.log("Number of emails uploaded: " + this.getNumEmails(this.emailListToUpload));*/


      // i am really sorry for whatever you guys are seeing here. i am very desperate now. - jq
      if (this.emailListToUpload && this.codeListToUpload) {
        const numberOfCode = await this.getNumCodes(this.codeListToUpload, this.voucherData.voucher.id);
        const numberOfEmail = await this.getNumEmails(this.emailListToUpload);

        if (numberOfCode < numberOfEmail) {
          return new alert("Update failed: number of available codes is less than number of given emails");
        }
        this.voucherService.uploadBothFiles(this.uploadBothFiles()).subscribe(() => {
          this.snackbar.open("Email list and code list uploaded successfully.", "OK", { duration: 2000 });
        });
        data.counter = numberOfCode.valueOf() as number - (numberOfEmail.valueOf() as number); // very crappy fix in v1.0, pls change this
        data.code_uploaded = true;
      } else if (this.emailListToUpload) {
        const emailList = this.uploadEmailList();
        const numberOfEmail = await this.getNumEmails(this.emailListToUpload);
        if (this.voucher.code_uploaded && this.voucher.counter < numberOfEmail) {
          return new alert("Update failed: number of available codes is less than number of given emails");
        }
        this.voucherService.uploadEmailList(emailList).subscribe(() => {
          this.snackbar.open("Email list uploaded successfully.", "OK", { duration: 2000 });
        });
        if (this.voucher.code_uploaded) {
          data.counter = this.voucher.counter - (numberOfEmail.valueOf() as number);
        }
      } else if (this.codeListToUpload) {
        const codeList = this.uploadCodeList();
        const numberOfCode = await this.getNumCodes(this.codeListToUpload, this.voucherData.voucher.id);
        this.voucherService.uploadCodeList(codeList).subscribe(() => {
          this.snackbar.open("Code list uploaded successfully.", "OK", { duration: 2000 });
        });
        data.counter = this.voucher.counter + (numberOfCode.valueOf() as number);
        data.code_uploaded = true;
      }

      if (this.imageToUpload) {
        data.image = this.imageToUpload;
      } else {
        delete data.image;
      }

      const dataCopy = { ...data };
      delete data.code_list;
      this.voucherService.patchVoucher(this.voucherData.voucher.id, this.toFormData(data)).subscribe();
    }
  }

  onDelete() {
    this.dialogRef.close({ delete: true });
  }

  toFormData(formValue) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      let value = formValue[key];
      if (key.includes('date')) {
        value = moment(value).format();
      }
      if (this.voucherData.mode === 'create' && key.includes('image')
        && this.imageToUpload) {
        formData.append(key, this.imageToUpload, this.imageToUpload.name);
      }
      formData.append(key, value);

    }
    return formData;
  }

  /*getNumCodes(id) {
    console.log(id);
    var count;
    this.voucherService.getNumCodes(id).subscribe(data => {
      this.numCode = data;
      count = data;
    }); 
  }

  async getNumCodes(id) {
    return new Promise((resolve, reject) => {
      this.voucherService.getNumCodes(id).subscribe(data => {
        resolve(data);
      }); 
    })
  }*/

  /*getNumCodeList(codes) {
    var allCodes = [];
    var count;
    var reader = new FileReader();
    reader.onloadend=function(){
      allCodes.push(reader.result)
      count = allCodes.pop().split("\n").length - 2;
      console.log(count);
    }
    reader.readAsText(codes);
  }*/

  /*getNumEmails(emails) {
    var allEmails = [];
    var count;
    var reader = new FileReader();
    reader.onloadend=async function(){
      allEmails.push(reader.result)
      count = allEmails.pop().split("\n").length - 2;
      console.log(count);
    }
    reader.readAsText(emails);
  }

  async getNumCodeList(codes) {
    return new Promise((resolve, reject) => {
      var allCodes = [];
      var count;
      var reader = new FileReader();
      reader.onloadend=async function(){
        allCodes.push(reader.result)
        count = allCodes.pop().split("\n").length - 2;
        console.log(count);
        resolve(count);
      }
      reader.readAsText(codes);
    });
  }*/

  async getNumCodes(codes, id) {
    return new Promise((resolve, reject) => {
      this.voucherService.getNumCodes(id).subscribe(data => {
        var allCodes = [];
        var count;
        var reader = new FileReader();
        reader.onloadend = async function () {
          allCodes.push(reader.result)
          count = allCodes.pop().split("\n").length - 2;
          resolve(count + data);
        }
        reader.readAsText(codes);
      });
    });
  }

  async getNumEmails(emails) {
    return new Promise((resolve, reject) => {
      var allEmails = [];
      var count;
      var reader = new FileReader();
      reader.onloadend = async function () {
        allEmails.push(reader.result)
        count = allEmails.pop().split("\n").length - 2;
        resolve(count);
      }
      reader.readAsText(emails);
    });
  }

  uploadEmailList() {
    const formData = new FormData();
    formData.append('email_list', this.emailListToUpload, this.emailListToUpload.name);
    formData.append('id', this.voucher.id);

    return formData;
  }

  uploadCodeList() {
    const formData = new FormData();
    formData.append('code_list', this.codeListToUpload, this.codeListToUpload.name);
    formData.append('id', this.voucher.id);

    return formData;
  }

  uploadBothFiles() {
    const formData = new FormData();
    formData.append('code_list', this.codeListToUpload, this.codeListToUpload.name);
    formData.append('email_list', this.emailListToUpload, this.emailListToUpload.name);
    formData.append('id', this.voucher.id);

    return formData;
  }

  onImageChange(event) {
    if (event.target.files.length > 0) {
      this.imageToUpload = event.target.files[0];
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.codeListToUpload = event.target.files[0];
    }
  }

  onEmailListChange(event) {
    if (event.target.files.length > 0) {
      this.emailListToUpload = event.target.files[0];
    }
  }
}