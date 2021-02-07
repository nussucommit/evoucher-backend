import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Organization } from '../model-service/organization/organization';
import { OrganizationService } from '../model-service/organization/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations = new MatTableDataSource<Organization>();
  tableColumns: String[] = ['name'];

  constructor(
    private organizationService: OrganizationService,
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.organizationService.getOrganizationList()
      .subscribe(
        (data: Organization[]) => {
          this.organizations.data = data;
        }
      );
  }
}
