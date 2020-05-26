import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDhashboardComponent } from './logs-dhashboard.component';

describe('LogsDhashboardComponent', () => {
  let component: LogsDhashboardComponent;
  let fixture: ComponentFixture<LogsDhashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsDhashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsDhashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
