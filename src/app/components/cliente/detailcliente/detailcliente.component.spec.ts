import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailclienteComponent } from './detailcliente.component';

describe('DetailclienteComponent', () => {
  let component: DetailclienteComponent;
  let fixture: ComponentFixture<DetailclienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailclienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
