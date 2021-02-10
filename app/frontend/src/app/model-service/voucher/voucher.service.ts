import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  private baseUrlVoucher = 'http://localhost:8000/api/voucher';

  constructor(private http: HttpClient) { }

  getVoucherList(filterParams: any): Observable<any> {
    return this.http.get(`${this.baseUrlVoucher}`, { params: filterParams });
  }

  getVoucherById(id: string): Observable<object> {
    return this.http.get(`${this.baseUrlVoucher}/${id}`);
  }

  createVocher(voucher: any): Observable<object> {
    return this.http.post(`${this.baseUrlVoucher}`, voucher);
  }
  
  updateVoucher(id: string, voucher: any): Observable<object> {
    return this.http.put(`${this.baseUrlVoucher}/${id}`, voucher);
  }

  deleteVoucher(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrlVoucher}/${id}`);
  }

  deleteAllVoucher(): Observable<any> {
    return this.http.delete(`${this.baseUrlVoucher}`);
  }
}
