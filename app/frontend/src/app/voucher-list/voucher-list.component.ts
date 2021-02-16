import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';
import { VoucherDetailsComponent } from '../voucher-details/voucher-details.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import {merge, of as observableOf} from 'rxjs';

import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements AfterViewInit {

  vouchers = new MatTableDataSource<Voucher>();
  tableColumns: String[] = ['name'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  formDialogOpened = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private voucherService: VoucherService,
    private dialog: MatDialog,
  ) { }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.voucherService.getVoucherList({page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize});
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.count;

          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        console.log(data);
        this.vouchers.data = data
      });
  }

  onInputPageChange(pageNumber: number) {
    this.paginator.pageIndex = Math.min(pageNumber - 1, this.paginator.getNumberOfPages() - 1);
  }

  reloadData() {
    (this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.voucherService.getVoucherList({page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize});
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.count;

          return data.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(
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
        if (result && result.delete) {
          this.confirmDelete(voucher.id);
        }
        this.reloadData();
      });
    }
  }

  confirmDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: `Voucher ${id}`});
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result.event == 'yes') {
          this.voucherService.deleteVoucher(id).subscribe(() => this.reloadData());
        }
      }
    );
  }


}

