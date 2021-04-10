import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebadmindashboardComponent } from './webadmindashboard.component';

describe('WebadmindashboardComponent', () => {
  let component: WebadmindashboardComponent;
  let fixture: ComponentFixture<WebadmindashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebadmindashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebadmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
