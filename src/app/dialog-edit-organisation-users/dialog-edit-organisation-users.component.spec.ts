import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { DialogEditOrganisationUsersComponent } from './dialog-edit-organisation-users.component';

describe('DialogEditOrganisationUsersComponent', () => {
  let component: DialogEditOrganisationUsersComponent;
  let fixture: ComponentFixture<DialogEditOrganisationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditOrganisationUsersComponent ],
      imports: [RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),  AngularFireModule.initializeApp(environment.firebase), MatDialogModule],
      providers : [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
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
