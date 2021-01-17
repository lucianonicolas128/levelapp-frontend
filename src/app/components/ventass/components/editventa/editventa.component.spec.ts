import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditventaComponent } from './editventa.component';

describe('EditventaComponent', () => {
  let component: EditventaComponent;
  let fixture: ComponentFixture<EditventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
