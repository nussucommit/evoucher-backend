import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      image: ['', Validators.required],
      code_list: [''],
      claims_left: [this.voucher ? this.voucher.claims_left : '', Validators.required]
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
    if (this.voucherData.mode === 'create') {
      console.log(data);
      this.voucherService.createVoucher(this.toFormData(data)).subscribe();
    } else if (this.voucherData.mode === 'edit') {
      const dataCopy = {...data};
      console.log(dataCopy);
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
      formData.append(key, value);
    }
    return formData;
  }

  onImageChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.voucherForm.get('image').setValue(file);
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.voucherForm.get('code_list').setValue(file);
    }
  }
}
