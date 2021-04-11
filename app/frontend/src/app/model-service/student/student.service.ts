import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrlStudent =  environment.frontendUrl + 'student';

  constructor(private http: HttpClient) { }

  getStudentList(filterParams: any): Observable<any> {
    return this.http.get(`${this.baseUrlStudent}`, { params: filterParams });
  }

  getStudentById(id: string): Observable<object> {
    return this.http.get(`${this.baseUrlStudent}/${id}`);
  }

  createStudent(student: any): Observable<object> {
    return this.http.post(`${this.baseUrlStudent}`, student);
  }
  
  updateStudent(id: string, student: any): Observable<object> {
    return this.http.put(`${this.baseUrlStudent}/${id}`, student);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrlStudent}/${id}`);
  }

  deleteAllStudent(): Observable<any> {
    return this.http.delete(`${this.baseUrlStudent}`);
  }
}
