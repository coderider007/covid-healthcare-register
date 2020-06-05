import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapLocationComponent } from './gmap-location.component';

describe('GmapLocationComponent', () => {
  let component: GmapLocationComponent;
  let fixture: ComponentFixture<GmapLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
