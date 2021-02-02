import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin } from './admin.component';

describe('AdminComponent', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admin ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
