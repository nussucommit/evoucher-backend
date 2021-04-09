import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.scss']
})
export class VoucherDetailsComponent implements OnInit {

  voucher: any;
  voucherForm: FormGroup;
  
  hasData: boolean;
  todayDate:Date = new Date();

  imageToUpload: any;
  fileToUpload: any;
  emailListToUpload: any;
  codeListToUpload: any;

  codeArr: string[];
  emailArr: string[];

  constructor(
    public dialogRef: MatDialogRef<VoucherDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public voucherData: any,
    public formBuilder: FormBuilder,
    public voucherService: VoucherService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.voucher = this.voucherData.voucher;

    this.hasData = this.voucher ? true : false;

    this.codeArr = [];
    this.emailArr = [];

    this.voucherForm = this.formBuilder.group({
      voucher_id: [{value: this.voucher ? this.voucher.voucher_id : '', disabled: this.voucher ? true : false}, Validators.required],
      available_date: [this.voucher ? this.voucher.available_date : '', Validators.required],
      expiry_date: [this.voucher ? this.voucher.expiry_date : '', Validators.required],
      organization: [this.voucher ? this.voucher.organization : '', Validators.required],
      voucher_type: [this.voucher ? this.voucher.voucher_type : '', Validators.required],
      name: [this.voucher ? this.voucher.name : '', Validators.required],
      description: [this.voucher ? this.voucher.description : '', Validators.required],
      image: [''],
      code_list: [''],
      email_list: [''],
    });
    this.voucherForm.addControl('code_list', new FormControl(null));

    this.setFileValidators();
  }

  imageCheck(control: AbstractControl): any {
    return new RegExp('.+\.(png|PNG|jpg|jpeg|JPG|JPEG)$').test(control.value) ? null : { image: true };
  }

  codeCheck(control: AbstractControl): any {
    return new RegExp('.+\.csv$').test(control.value) ? null : { code_list: true };
  }

  emailCheck(control: AbstractControl): any {
    return new RegExp('.+\.csv').test(control.value) ? null : { email_list: true };
  }

  getDialogTitle() {
    if (this.voucherData.mode === 'create') {
      return 'Create Voucher';
    }  else if (this.voucherData.mode === 'edit') {
      return 'Edit Voucher';
    }
  }

  setFileValidators() {
    if (this.voucherData.mode == "create") {
      this.voucherForm.get('image').setValidators([Validators.required, this.imageCheck]);
    } else {
      this.voucherForm.get('code_list').setValidators([this.codeCheck]);
      this.voucherForm.get('email_list').setValidators([this.emailCheck]);
    }
  }

  onSubmit() {
    this.dialogRef.close();
    const data = this.voucherForm.value;
    data.posted_date = this.todayDate;
    data.counter = 0;
    if (this.voucherData.mode === 'create') {
      this.voucherService.createVoucher(this.toFormData(data)).subscribe();
      
    } else if (this.voucherData.mode === 'edit') {

      const codeList = this.uploadCodeList();
      const emailList = this.uploadEmailList();

      if (this.codeListToUpload) {
        this.voucherService.uploadCodeList(codeList).subscribe();
      }
      if (this.emailListToUpload) {
        this.voucherService.uploadEmailList(emailList).subscribe();
      }


      const dataCopy = {...data};
      console.log(data);
      delete data.image;
      delete data.code_list;
      this.voucherService.patchVoucher(this.voucherData.voucher.id, this.toFormData(data)).subscribe();
    }
    
   
  }

  onDelete() {
    this.dialogRef.close({delete: true});
  }

  toFormData(formValue) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)){
      let value = formValue[key];
      if (key.includes('date')) {
        value = moment(value).format();
      }
      if (this.voucherData.mode === 'create' && key.includes('image')) {
        formData.append(key, this.imageToUpload, this.imageToUpload.name);
      }
      formData.append(key,value);
      
    }
    return formData;
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