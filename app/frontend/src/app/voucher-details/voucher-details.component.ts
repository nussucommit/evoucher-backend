import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';

@Component({
  selector: 'app-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.scss']
})
export class VoucherDetailsComponent implements OnInit {

  voucher: any;
  voucherForm: FormGroup;
  
  hasData: boolean;

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
      id: [{value: this.voucher ? this.voucher.id : '', disabled: this.voucher ? true : false}, Validators.required],
      posted_date: [this.voucher ? this.voucher.posted_date : '', Validators.required],
      expiry_date: [this.voucher ? this.voucher.expiry_date : '', Validators.required],
      name: [this.voucher ? this.voucher.name : '', Validators.required],
      description: [this.voucher ? this.voucher.description : '', Validators.required],
      claims_left: [this.voucher ? this.voucher.claims_left : '', Validators.required]
    });
  }

  getDialogTitle() {
    if (this.voucherData.mode === 'create') {
      return 'Create Voucher';
    } 
  }

  onSubmit() {
    this.dialogRef.close();
    const data = this.voucherForm.value;
    if (this.voucherData.mode === 'create') {
      this.voucherService.createVoucher(data).subscribe();
    } 
  }

}
