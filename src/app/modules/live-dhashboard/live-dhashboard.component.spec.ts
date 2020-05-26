import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDhashboardComponent } from './live-dhashboard.component';

describe('LiveDhashboardComponent', () => {
  let component: LiveDhashboardComponent;
  let fixture: ComponentFixture<LiveDhashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDhashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDhashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
