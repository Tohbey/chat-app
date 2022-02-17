import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmirComponent } from './admir.component';

describe('AdmirComponent', () => {
  let component: AdmirComponent;
  let fixture: ComponentFixture<AdmirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
