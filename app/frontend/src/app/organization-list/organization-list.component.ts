import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Organization } from '../model-service/organization/organization';
import { OrganizationService } from '../model-service/organization/organization.service';

import {of as observableOf} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements AfterViewInit {

  organizations = new MatTableDataSource<Organization>();
  tableColumns: String[] = ['name'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private organizationService: OrganizationService,
  ) { }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.organizationService.getOrganizationList({page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize});
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
        this.organizations.data = data
      });
  }

  onInputPageChange(pageNumber: number) {
    this.paginator.pageIndex = Math.min(pageNumber - 1, this.paginator.getNumberOfPages() - 1);
  }
}