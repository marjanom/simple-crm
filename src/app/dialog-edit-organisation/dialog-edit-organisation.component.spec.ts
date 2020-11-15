import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditOrganisationComponent } from './dialog-edit-organisation.component';

describe('DialogEditOrganisationComponent', () => {
  let component: DialogEditOrganisationComponent;
  let fixture: ComponentFixture<DialogEditOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditOrganisationComponent ]
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
