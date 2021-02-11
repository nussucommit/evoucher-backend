import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';
import { VoucherDetailsComponent } from '../voucher-details/voucher-details.component';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {

  vouchers = new MatTableDataSource<Voucher>();
  tableColumns: String[] = ['id', 'posted_date', 'expiry_date', 'name', 'description', 'claims_left'];

  formDialogOpened = false;

  constructor(
    private voucherService: VoucherService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.voucherService.getVoucherList()
      .subscribe(
        (data: Voucher[]) => {
          this.vouchers.data = data;
        }
      );
  }

  openEditDialog(voucher: any, mode: string) {
    if (!this.formDialogOpened) {
      this.formDialogOpened = true;
      const dialogRef = this.dialog.open(VoucherDetailsComponent, {data: {voucher, mode}});
      dialogRef.afterClosed().subscribe((result)=>{
        this.formDialogOpened = false;
        this.reloadData();
      });
    }
  }


}

