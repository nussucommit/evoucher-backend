import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Faculty } from '../model-service/faculty/faculty';
import { FacultyService } from '../model-service/faculty/faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {

  faculties = new MatTableDataSource<Faculty>();
  tableColumns: String[] = ['name'];

  constructor(
    private facultyService: FacultyService,
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.facultyService.getFacultyList()
      .subscribe(
        (data: Faculty[]) => {
          this.faculties.data = data;
        }
      );
  }
}
