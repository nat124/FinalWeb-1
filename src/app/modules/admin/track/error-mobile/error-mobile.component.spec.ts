import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMobileComponent } from './error-mobile.component';

describe('ErrorMobileComponent', () => {
  let component: ErrorMobileComponent;
  let fixture: ComponentFixture<ErrorMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
