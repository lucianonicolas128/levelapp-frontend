import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestarComponent } from './presupuestar.component';

describe('PresupuestarComponent', () => {
  let component: PresupuestarComponent;
  let fixture: ComponentFixture<PresupuestarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
