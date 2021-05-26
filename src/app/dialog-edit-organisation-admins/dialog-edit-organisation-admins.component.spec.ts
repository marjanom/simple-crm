import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { DialogEditOrganisationAdminsComponent } from './dialog-edit-organisation-admins.component';

describe('DialogEditOrganisationAdminsComponent', () => {
  let component: DialogEditOrganisationAdminsComponent;
  let fixture: ComponentFixture<DialogEditOrganisationAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditOrganisationAdminsComponent ],
      imports: [RouterModule.forRoot([]),  AngularFireModule.initializeApp(environment.firebase),MatDialogModule],
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
    fixture = TestBed.createComponent(DialogEditOrganisationAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
