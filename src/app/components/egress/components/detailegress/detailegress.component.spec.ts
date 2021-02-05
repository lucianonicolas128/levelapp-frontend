import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailegressComponent } from './detailegress.component';

describe('DetailegresoComponent', () => {
  let component: DetailegressComponent;
  let fixture: ComponentFixture<DetailegressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailegressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailegressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
