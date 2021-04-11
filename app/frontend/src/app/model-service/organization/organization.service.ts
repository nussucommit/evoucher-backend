import { StudentLoginService } from './../users/student-login/login.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private baseUrlOrganization = 'http://localhost:8000/api/organization';

  constructor(
    private http: HttpClient,
    private studentloginservice : StudentLoginService
    ) { }

  getOrganizationList(filterParams: any): Observable<any> {
    return this.http.get(`${this.baseUrlOrganization}`, { params: filterParams });
  }

  getAllOrganization(): Observable<any> {
    return this.http.get(`${this.baseUrlOrganization}`);
  }

  getOrganizationById(id: number): Observable<object> {
    return this.http.get(`${this.baseUrlOrganization}/${id}`);
  }

  getOrgNotYetSignUp(): Observable<any> {
    return this.http.get(`${this.baseUrlOrganization}/notsignup`);
  }

  getOrgByUsername(): Observable<any> {
    var username = this.studentloginservice.currentUserValue.username;
    return this.http.get(`${this.baseUrlOrganization}/getorgbyuname/${username}`);
  }

  createOrganization(organization: any): Observable<object> {
    return this.http.post(`${this.baseUrlOrganization}`, organization);
  }
  
  updateOrganization(id: string, organization: any): Observable<object> {
    return this.http.put(`${this.baseUrlOrganization}/${id}`, organization);
  }

  patchOrganization(id: string, organization: any): Observable<object> {
    return this.http.patch(`${this.baseUrlOrganization}/${id}`, organization);
  }

  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrlOrganization}/${id}`);
  }

  deleteAllOrganization(): Observable<any> {
    return this.http.delete(`${this.baseUrlOrganization}`);
  }
}
