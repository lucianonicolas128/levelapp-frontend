import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddegressComponent } from './addegress.component';

describe('AddegressComponent', () => {
  let component: AddegressComponent;
  let fixture: ComponentFixture<AddegressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddegressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddegressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
