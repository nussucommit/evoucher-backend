import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDetailsComponent } from './faculty-details.component';

describe('FacultyDetailsComponent', () => {
  let component: FacultyDetailsComponent;
  let fixture: ComponentFixture<FacultyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
