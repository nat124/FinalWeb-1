import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PistisEventNotiComponent } from './pistis-event-noti.component';

describe('PistisEventNotiComponent', () => {
  let component: PistisEventNotiComponent;
  let fixture: ComponentFixture<PistisEventNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PistisEventNotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PistisEventNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
