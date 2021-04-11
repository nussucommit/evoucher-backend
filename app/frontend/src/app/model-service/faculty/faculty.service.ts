import { environment } from './../../../environments/environment.prod';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private baseUrlFaculty = environment.backendUrl + 'faculty';
  
  constructor(private http: HttpClient) { }

  getFacultyList(filterParams: any): Observable<any> {
    return this.http.get(`${this.baseUrlFaculty}`, { params: filterParams });
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
