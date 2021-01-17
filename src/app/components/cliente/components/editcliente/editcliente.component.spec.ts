import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclienteComponent } from './editcliente.component';

describe('EditclienteComponent', () => {
  let component: EditclienteComponent;
  let fixture: ComponentFixture<EditclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
