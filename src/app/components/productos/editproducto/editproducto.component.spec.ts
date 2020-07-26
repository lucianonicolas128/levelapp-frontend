import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductoComponent } from './editproducto.component';

describe('EditproductoComponent', () => {
  let component: EditproductoComponent;
  let fixture: ComponentFixture<EditproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
