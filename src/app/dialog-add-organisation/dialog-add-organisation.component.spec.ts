import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { DialogAddOrganisationComponent } from './dialog-add-organisation.component';

describe('DialogAddOrganisationComponent', () => {
  let component: DialogAddOrganisationComponent;
  let fixture: ComponentFixture<DialogAddOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, MatDialogModule],
      declarations: [ DialogAddOrganisationComponent ],
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
    fixture = TestBed.createComponent(DialogAddOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
