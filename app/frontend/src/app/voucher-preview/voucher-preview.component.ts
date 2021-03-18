import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-voucher-preview',
  templateUrl: './voucher-preview.component.html',
  styleUrls: ['./voucher-preview.component.scss']
})
export class VoucherPreviewComponent implements OnInit {

  emailForm: FormGroup;
  claimStatus: string;
  buttonClicked = false;

  constructor(
    public dialogRef: MatDialogRef<VoucherPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public voucherData: any,
    private formBuilder: FormBuilder
  ) { }

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
    this.claimStatus = "A link has been sent to your email account. You may need to check your junk folder."
  }

  onEdit() {
    // TODO: open a new edit dialog
  }

  onDelete() {
    // TODO: open a confirmation dialog
  }
}
