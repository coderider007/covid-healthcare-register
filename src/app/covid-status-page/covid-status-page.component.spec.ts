import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidStatusPageComponent } from './covid-status-page.component';

describe('CovidStatusPageComponent', () => {
  let component: CovidStatusPageComponent;
  let fixture: ComponentFixture<CovidStatusPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidStatusPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
