import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditOrganisationUsersComponent } from './dialog-edit-organisation-users.component';

describe('DialogEditOrganisationUsersComponent', () => {
  let component: DialogEditOrganisationUsersComponent;
  let fixture: ComponentFixture<DialogEditOrganisationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditOrganisationUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditOrganisationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
