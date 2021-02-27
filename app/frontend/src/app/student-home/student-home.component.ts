import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';
import { VoucherPreviewComponent } from '../voucher-preview/voucher-preview.component';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  voucherData: Voucher[] = [];
  currentPage = 1;
  totalNumber: number;

  isPreviewDialogOpened = false;

  constructor(
    private voucherService: VoucherService,
    private dialog: MatDialog
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

  tileOnClick(voucher) {
    if (!this.isPreviewDialogOpened) {
      this.isPreviewDialogOpened = true;
      // subsequently you will need to pass the image as a variable
      const dialogRef = this.dialog.open(VoucherPreviewComponent, 
        { data: { voucher, mode: 'claim', imageUrl: '../../assets/placeholder.jpg' } });
      dialogRef.afterClosed().subscribe(() => this.isPreviewDialogOpened = false);
    }
  }
}
