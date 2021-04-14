import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Voucher } from '../model-service/voucher/voucher';
import { StudentUser } from '../model-service/users/student-login/users';
import { VoucherService } from '../model-service/voucher/voucher.service';
import { VoucherPreviewComponent } from '../voucher-preview/voucher-preview.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  public currentUserSubject: BehaviorSubject<StudentUser>;
  public currentUser: Observable<StudentUser>;

  @ViewChild('theContainer') theContainer;
  columnNum = 5;
  tileSize = 250;
  
  setColNum(){
    let width = this.theContainer.nativeElement.offsetWidth;
    this.columnNum = Math.trunc(width/this.tileSize);
  }

  //calculating upon loading 
  ngAfterViewInit() {
    this.setColNum();
  }

  //recalculating upon browser window resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setColNum();
  }

  idCodeEmailData: any[] = [];
  voucherData: any[] = [];
  //currentPage = 1;
  //totalNumber: number;

  isPreviewDialogOpened = false;

  constructor(
    private voucherService: VoucherService,
    private dialog: MatDialog
  ) { 
    this.currentUserSubject = new BehaviorSubject<StudentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUserSubject.value);
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.loadData().subscribe(data => {
      console.log(data);
      console.log(data['data']);
      data['data'].map(x => this.voucherService.getVoucherById(x.voucher_id).subscribe(data => {
        this.voucherService.getCodeByCodeList(x.code_id).subscribe(data2 => {
          data['code'] = data2
          console.log(data);
          this.voucherData.push(data);
        });
      }))
    });
  }

  loadData() {
    return this.voucherService.getVoucherByEmail(this.currentUserSubject.value.username);
  }

  /*async loadCode(id) {
    return new Promise((resolve, reject) => {
      const code = this.voucherService.getCodeByCodeList(id);
      resolve(code);
    });
  }*/

  /*loadDatabyPage(page: number) {
    return this.voucherService.getVouchersWithoutFilter(page);
  }

  loadInitialData() {
    this.loadDatabyPage(1).subscribe(data => {
      this.voucherData = data.results;
      console.log(this.voucherData);
    });
  }*/

  /*loadMore() {
    this.currentPage++;
    this.loadDatabyPage(this.currentPage).subscribe(data => {
      this.voucherData = this.voucherData.concat(data.results);
    })
  }*/

  tileOnClick(voucher) {
    if (!this.isPreviewDialogOpened) {
      this.isPreviewDialogOpened = true;
      // subsequently you will need to pass the image as a variable
      const dialogRef = this.dialog.open(VoucherPreviewComponent, 
        { data: { voucher, mode: 'claim', imageUrl: '../../assets/nussu_logo.png' } });
      dialogRef.afterClosed().subscribe(() => this.isPreviewDialogOpened = false);
    }
  }
}
