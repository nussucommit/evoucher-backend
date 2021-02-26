import { Component, OnInit } from '@angular/core';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  voucherData: Voucher[] = [];
  currentPage = 1;
  totalNumber: number;

  constructor(
    private voucherService: VoucherService
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadDatabyPage(1).subscribe(data => {
      this.voucherData = data.results;
      this.totalNumber = data.count;
    });
  }

  loadDatabyPage(page: number) {
    return this.voucherService.getVouchersWithoutFilter(page);
  }

  loadMore() {
    this.currentPage++;
    this.loadDatabyPage(this.currentPage).subscribe(data => {
      this.voucherData = this.voucherData.concat(data.results);
    })
  }

}
