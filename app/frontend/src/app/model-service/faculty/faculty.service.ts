import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private baseUrlFaculty = 'http://localhost:8000/api/faculty';
  
  constructor(private http: HttpClient) { }

  getFacultyList(): Observable<any> {
    return this.http.get(`${this.baseUrlFaculty}`);
  }

  getFaculyById(id: number): Observable<object> {
    return this.http.get(`${this.baseUrlFaculty}/${id}`);
  }

  createFaculty(faculty: any): Observable<object> {
    return this.http.post(`${this.baseUrlFaculty}`, faculty);
  }
  
  updateFaculty(id: number, faculty: any): Observable<object> {
    return this.http.put(`${this.baseUrlFaculty}/${id}`, faculty);
  }

  deleteFaculty(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrlFaculty}/${id}`);
  }

  deleteAllFaculty(): Observable<any> {
    return this.http.delete(`${this.baseUrlFaculty}`);
  }
}
