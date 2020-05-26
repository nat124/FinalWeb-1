import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveReportlayoutComponent } from './live-reportlayout.component';

describe('LiveReportlayoutComponent', () => {
  let component: LiveReportlayoutComponent;
  let fixture: ComponentFixture<LiveReportlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveReportlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveReportlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
