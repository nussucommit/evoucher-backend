import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoginFormComponent } from './login-form.component';

describe('StudentLoginFormComponent', () => {
  let component: StudentLoginFormComponent;
  let fixture: ComponentFixture<StudentLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});