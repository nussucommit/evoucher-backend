import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {

  vouchers = new MatTableDataSource<Voucher>();
  tableColumns: String[] = ['id', 'posted_date', 'expiry_date', 'name', 'description', 'claims_left'];

  constructor(
    private voucherService: VoucherService,
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
}
