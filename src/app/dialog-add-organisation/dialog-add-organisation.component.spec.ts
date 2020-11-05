import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddOrganisationComponent } from './dialog-add-organisation.component';

describe('DialogAddOrganisationComponent', () => {
  let component: DialogAddOrganisationComponent;
  let fixture: ComponentFixture<DialogAddOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddOrganisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
