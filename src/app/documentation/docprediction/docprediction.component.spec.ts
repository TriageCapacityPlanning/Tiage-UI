import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocpredictionComponent } from './docprediction.component';

describe('DocpredictionComponent', () => {
  let component: DocpredictionComponent;
  let fixture: ComponentFixture<DocpredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocpredictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocpredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
