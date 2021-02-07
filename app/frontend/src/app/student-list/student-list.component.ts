import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../model-service/student/student';
import { StudentService } from '../model-service/student/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students = new MatTableDataSource<Student>();
  tableColumns: String[] = ['nusnet_id', 'name', 'year']

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.studentService.getStudentList()
      .subscribe(
        (data: Student[]) => {
          this.students.data = data;
        }
      );
  }
}
