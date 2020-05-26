import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSquareComponent } from './layout-square.component';

describe('LayoutSquareComponent', () => {
  let component: LayoutSquareComponent;
  let fixture: ComponentFixture<LayoutSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
