import { OrganizationDetailsComponent } from './../organization-details/organization-details.component';
import { Organization } from './../model-service/organization/organization';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './../model-service/users/login.service';
import { OrganizationService } from '../model-service/organization/organization.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, of as observableOf} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-webadmindashboard',
  templateUrl: './webadmindashboard.component.html',
  styleUrls: ['./webadmindashboard.component.scss']
})
export class WebadmindashboardComponent implements OnInit {

  organizationList: any;
  orgWoUname : any;
  addForm = false;
  addUsernameForm = false;
  showPassword = false;
  orgNameToAdd : string;
  usernameToAdd : string;
  temppassword : string;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  formDialogOpened = false;

  organizations = new MatTableDataSource<Organization>();
  tableColumns: String[] = ['name', 'username'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private orgService : OrganizationService,
    private loginService: LoginService,
    private dialog: MatDialog,
  ) { }

  onInputPageChange(pageNumber: number) {
    this.paginator.pageIndex = Math.min(pageNumber - 1, this.paginator.getNumberOfPages() - 1);
  }

  ngOnInit(): void {
    this.reloadOrganizations();

    // this.orgService.getOrgNotYetSignUp().subscribe(data => {
    //   this.orgWoUname = data;
    //   console.log(this.orgWoUname);
    // });
  }

  reloadOrganizations() {
    (this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.orgService.getAllOrganization();
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
      ).subscribe(
          (data: Organization[]) => {
            this.organizations.data = data;
          }
      );
  }

  openAddDialog() {
    if (!this.formDialogOpened) {
      this.formDialogOpened = true;
      const dialogRef = this.dialog.open(OrganizationDetailsComponent);
      dialogRef.afterClosed().subscribe((result)=>{
        this.formDialogOpened = false;
        // if (result && result.delete) {
        //   this.confirmDelete(voucher.id);
        // }
        this.reloadOrganizations();
      });
    }
  }

}
