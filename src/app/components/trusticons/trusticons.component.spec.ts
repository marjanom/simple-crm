import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrusticonsComponent } from './trusticons.component';

describe('TrusticonsComponent', () => {
  let component: TrusticonsComponent;
  let fixture: ComponentFixture<TrusticonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrusticonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrusticonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
