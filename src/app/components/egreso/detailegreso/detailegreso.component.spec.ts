import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailegresoComponent } from './detailegreso.component';

describe('DetailegresoComponent', () => {
  let component: DetailegresoComponent;
  let fixture: ComponentFixture<DetailegresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailegresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
