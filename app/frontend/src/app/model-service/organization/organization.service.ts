import { StudentLoginService } from './../users/student-login/login.service';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../users/login.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private baseUrlOrganization = environment.backendUrl + 'organization';

  constructor(
    private http: HttpClient,
    private loginservice : LoginService
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
    var username = this.loginservice.currentUserValue.username;
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
