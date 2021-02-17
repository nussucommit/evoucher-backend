import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../model-service/student/student';
import { StudentService } from '../model-service/student/student.service';

import {of as observableOf} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements AfterViewInit {

  students = new MatTableDataSource<Student>();
  tableColumns: String[] = ['nusnet_id', 'name', 'year'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private StudentService: StudentService,
  ) { }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.StudentService.getStudentList({page: this.paginator.pageIndex + 1, page_size: this.paginator.pageSize});
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
        this.students.data = data
      });
  }

  onInputPageChange(pageNumber: number) {
    this.paginator.pageIndex = Math.min(pageNumber - 1, this.paginator.getNumberOfPages() - 1);
  }
}