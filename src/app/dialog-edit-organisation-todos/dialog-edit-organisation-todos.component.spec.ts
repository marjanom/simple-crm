import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditOrganisationTodosComponent } from './dialog-edit-organisation-todos.component';

describe('DialogEditOrganisationTodosComponent', () => {
  let component: DialogEditOrganisationTodosComponent;
  let fixture: ComponentFixture<DialogEditOrganisationTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditOrganisationTodosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditOrganisationTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
