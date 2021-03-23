import { Organization } from './../model-service/organization/organization';
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
export class VoucherListComponent implements AfterViewInit, OnInit {

  vouchers = new MatTableDataSource<Voucher>();
  tableColumns: String[] = ['voucher_id', 'name', 'available_date', 'expiry_date', 'organization' ,'voucher_type' ,'description', 'claims_left'];
  filterCategories: String[] = ['Organization', 'Faculty'];
  organizationList: any;
  typeList:any;

  filterForm: FormGroup;
  
  displayFilter = false;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  edit : boolean;

  formDialogOpened = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private voucherService: VoucherService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.edit = false;
    this.filterForm = this.formBuilder.group({
      Organization: ['', ''],
      Faculty: ['','' ],
      Available: ['',''],
      OrderBy:['',''],
    });
  }
  setDisplayFilter() {
    this.displayFilter = this.displayFilter ? false : true;
  }
  
  ngAfterViewInit() {
    this.reloadData();
  }

  onInputPageChange(pageNumber: number) {
    this.paginator.pageIndex = Math.min(pageNumber - 1, this.paginator.getNumberOfPages() - 1);
  }

  onSubmit() {
    console.log(this.filterForm.value.Organization);
    this.reloadData();
  }
 
  parseFilterForm(filterForm: FormGroup) {
    let filterParams = { ...this.filterForm.value }
    if (filterForm.value.Available) {
      filterParams.Available = filterParams.Available.format("YYYY-MM-DD HH:mm");
    }
    filterParams = Object.assign(filterParams,
      {
        page: this.paginator.pageIndex + 1,
        page_size: this.paginator.pageSize
      });
    return filterParams;
  }

  reloadData() {
    (this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.voucherService.getVoucherList(this.parseFilterForm(this.filterForm));
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

    this.voucherService.getOrganizationInVoucher().subscribe(data => {
      console.log(data);
      this.organizationList = data;
    })

    
    
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

  updateOrderBy() {
    console.log(this.filterForm.value.OrderBy);
    this.reloadData()
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

