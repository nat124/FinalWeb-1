import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PistisNotiListComponent } from './pistis-noti-list.component';

describe('PistisNotiListComponent', () => {
  let component: PistisNotiListComponent;
  let fixture: ComponentFixture<PistisNotiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PistisNotiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PistisNotiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
