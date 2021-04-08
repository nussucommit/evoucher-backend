import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';
import * as moment from 'moment';

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

  constructor(
    public dialogRef: MatDialogRef<VoucherDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public voucherData: any,
    public formBuilder: FormBuilder,
    public voucherService: VoucherService
  ) { }

  ngOnInit(): void {
    this.voucher = this.voucherData.voucher;

    this.hasData = this.voucher ? true : false;

    this.voucherForm = this.formBuilder.group({
      voucher_id: [{value: this.voucher ? this.voucher.voucher_id : '', disabled: this.voucher ? true : false}, Validators.required],
      available_date: [this.voucher ? this.voucher.posted_date : '', Validators.required],
      expiry_date: [this.voucher ? this.voucher.expiry_date : '', Validators.required],
      name: [this.voucher ? this.voucher.name : '', Validators.required],
      description: [this.voucher ? this.voucher.description : '', Validators.required],
      image: [this.voucher ? this.voucher.image : '', Validators.required],
    });
  }

  getDialogTitle() {
    if (this.voucherData.mode === 'create') {
      return 'Create Voucher';
    }  else if (this.voucherData.mode === 'edit') {
      return 'Edit Voucher';
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
      if (this.emailListToUpload) {
        this.voucherService.uploadEmailList(this.uploadEmailList()).subscribe();
      }
      if (this.codeListToUpload) {
        this.voucherService.uploadCodeList(this.uploadCodeList()).subscribe();
      }
      const dataCopy = {...data};
      const finalData: Voucher = Object.assign(dataCopy, {voucher_id: this.voucherData.voucher.voucher_id}) as Voucher;
      this.voucherService.updateVoucher(this.voucherData.voucher.id, this.toFormData(finalData)).subscribe();
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
      if (key.includes('image')) {
        if (this.imageToUpload != '') { 
          formData.append(key, this.imageToUpload, this.imageToUpload.name);
        }
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