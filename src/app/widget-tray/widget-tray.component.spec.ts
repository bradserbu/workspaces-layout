import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTrayComponent } from './widget-tray.component';

describe('WidgetTrayComponent', () => {
  let component: WidgetTrayComponent;
  let fixture: ComponentFixture<WidgetTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
