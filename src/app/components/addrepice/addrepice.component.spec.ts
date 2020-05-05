import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrepiceComponent } from './addrepice.component';

describe('AddrepiceComponent', () => {
  let component: AddrepiceComponent;
  let fixture: ComponentFixture<AddrepiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrepiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrepiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
