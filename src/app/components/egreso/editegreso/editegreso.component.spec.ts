import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditegresoComponent } from './editegreso.component';

describe('EditegresoComponent', () => {
  let component: EditegresoComponent;
  let fixture: ComponentFixture<EditegresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditegresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
