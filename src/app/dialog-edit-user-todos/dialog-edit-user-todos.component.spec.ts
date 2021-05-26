import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { DialogEditUserTodosComponent } from './dialog-edit-user-todos.component';

describe('DialogEditUserTodosComponent', () => {
  let component: DialogEditUserTodosComponent;
  let fixture: ComponentFixture<DialogEditUserTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditUserTodosComponent ],
      imports: [RouterModule.forRoot([]),  AngularFireModule.initializeApp(environment.firebase), MatDialogModule],
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
    fixture = TestBed.createComponent(DialogEditUserTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
