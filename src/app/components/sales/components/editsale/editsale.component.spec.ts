import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsaleComponent } from './editsale.component';

describe('EditsaleComponent', () => {
  let component: EditsaleComponent;
  let fixture: ComponentFixture<EditsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
