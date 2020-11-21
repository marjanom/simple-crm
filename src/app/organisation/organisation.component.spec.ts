import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { OrganisationComponent } from './organisation.component';

describe('OrganisationComponent', () => {
  let component: OrganisationComponent;
  let fixture: ComponentFixture<OrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, AngularFireModule.initializeApp(environment.firebase)],
      declarations: [ OrganisationComponent ],
      providers: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
