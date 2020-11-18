import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditOrganisationAdminsComponent } from './dialog-edit-organisation-admins.component';

describe('DialogEditOrganisationAdminsComponent', () => {
  let component: DialogEditOrganisationAdminsComponent;
  let fixture: ComponentFixture<DialogEditOrganisationAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditOrganisationAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditOrganisationAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
