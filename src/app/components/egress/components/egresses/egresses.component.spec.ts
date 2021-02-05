import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgressesComponent } from './egresses.component';

describe('EgresosComponent', () => {
  let component: EgressesComponent;
  let fixture: ComponentFixture<EgressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EgressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
