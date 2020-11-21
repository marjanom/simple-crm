import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { DialogEditOrganisationComponent } from './dialog-edit-organisation.component';

describe('DialogEditOrganisationComponent', () => {
  let component: DialogEditOrganisationComponent;
  let fixture: ComponentFixture<DialogEditOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, RouterModule.forRoot([]), MatDialogModule, ],
      declarations: [ DialogEditOrganisationComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
