import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogslayoutComponent } from './logslayout.component';

describe('LogslayoutComponent', () => {
  let component: LogslayoutComponent;
  let fixture: ComponentFixture<LogslayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogslayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogslayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
