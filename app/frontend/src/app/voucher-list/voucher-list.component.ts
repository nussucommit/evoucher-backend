import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Voucher } from '../model-service/voucher/voucher';
import { VoucherService } from '../model-service/voucher/voucher.service';

import {of as observableOf} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements AfterViewInit {

  vouchers = new MatTableDataSource<Voucher>();
  tableColumns: String[] = ['id', 'name', 'posted_date', 'expiry_date', 'description', 'claims_left'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private VoucherService: VoucherService,
  ) { }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.VoucherService.getVoucherList({page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize});
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
}