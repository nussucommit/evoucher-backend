import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { VoucherService } from '../model-service/voucher/voucher.service';

@Component({
  selector: 'app-voucher-preview',
  templateUrl: './voucher-preview.component.html',
  styleUrls: ['./voucher-preview.component.scss']
})
export class VoucherPreviewComponent implements OnInit {

  emailForm: FormGroup;
  claimStatus: string;
  buttonClicked = false;
  codeArray: string[];

  constructor(
    public dialogRef: MatDialogRef<VoucherPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public voucherData: any,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public voucherService: VoucherService
  ) { 
    this.http.get(this.voucherData.voucher.code_list, {responseType: 'text'})
    .subscribe(
        data => {
            this.codeArray = data.split(",");
        },
        error => {
            console.log(error);
        }
    );
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, this.emailCheck]]
    })
  }

  emailCheck(control: AbstractControl): any {
    return new RegExp('^e[0-9]{7}@u\.nus\.edu$').test(control.value) ? null : { email: true };
  }

  onClaim() {
    // TODO: check if the email has claimed this voucher. if yes, send email. otherwise, throw an error.
    this.buttonClicked = true;
    this.emailForm.disable();
    // conduct your check here.
    let message;
    if (this.voucherData.voucher.counter < this.codeArray.length) {
      message = "Your voucher code is: " + this.codeArray[this.voucherData.voucher.counter];
    } else {
      message = "There is no voucher left";
    }
    this.voucherData.voucher.counter++;
    this.voucherService.patchVoucher(this.voucherData.voucher.id, {"counter": this.voucherData.voucher.counter}).subscribe();
    this.claimStatus = message;
  }

  onEdit() {
    // TODO: open a new edit dialog
  }

  onDelete() {
    // TODO: open a confirmation dialog
  }
}
