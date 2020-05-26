import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutReactangleComponent } from './layout-reactangle.component';

describe('LayoutReactangleComponent', () => {
  let component: LayoutReactangleComponent;
  let fixture: ComponentFixture<LayoutReactangleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutReactangleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutReactangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
