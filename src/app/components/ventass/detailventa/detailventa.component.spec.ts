import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailventaComponent } from './detailventa.component';

describe('DetailventaComponent', () => {
  let component: DetailventaComponent;
  let fixture: ComponentFixture<DetailventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
