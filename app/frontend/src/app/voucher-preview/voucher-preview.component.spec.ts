import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherPreviewComponent } from './voucher-preview.component';

describe('VoucherPreviewComponent', () => {
  let component: VoucherPreviewComponent;
  let fixture: ComponentFixture<VoucherPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
