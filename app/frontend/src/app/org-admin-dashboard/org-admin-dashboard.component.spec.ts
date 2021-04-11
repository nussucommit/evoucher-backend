import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAdminDashboardComponent } from './org-admin-dashboard.component';

describe('OrgAdminDashboardComponent', () => {
  let component: OrgAdminDashboardComponent;
  let fixture: ComponentFixture<OrgAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
