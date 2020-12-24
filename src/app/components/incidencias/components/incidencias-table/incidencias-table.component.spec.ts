import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciasTableComponent } from './incidencias-table.component';

describe('IncidenciasTableComponent', () => {
  let component: IncidenciasTableComponent;
  let fixture: ComponentFixture<IncidenciasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenciasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
