import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Faculty } from '../model-service/faculty/faculty';
import { FacultyService } from '../model-service/faculty/faculty.service';

import {of as observableOf} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements AfterViewInit {

  faculties = new MatTableDataSource<Faculty>();
  tableColumns: String[] = ['name'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private facultyService: FacultyService,
  ) { }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.facultyService.getFacultyList({page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize});
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
        this.faculties.data = data
      });
  }

  onInputPageChange(pageNumber: number) {
    this.paginator.pageIndex = Math.min(pageNumber - 1, this.paginator.getNumberOfPages() - 1);
  }
}

