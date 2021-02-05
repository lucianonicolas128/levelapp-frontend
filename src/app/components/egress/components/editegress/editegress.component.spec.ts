import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditegressComponent } from './editegress.component';

describe('EditegresoComponent', () => {
  let component: EditegressComponent;
  let fixture: ComponentFixture<EditegressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditegressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditegressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
