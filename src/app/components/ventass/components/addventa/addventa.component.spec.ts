import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddventaComponent } from './addventa.component';

describe('AddventaComponent', () => {
  let component: AddventaComponent;
  let fixture: ComponentFixture<AddventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
