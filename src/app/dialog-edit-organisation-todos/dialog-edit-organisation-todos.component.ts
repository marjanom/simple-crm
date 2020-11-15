import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';

@Component({
  selector: 'app-dialog-edit-organisation-todos',
  templateUrl: './dialog-edit-organisation-todos.component.html',
  styleUrls: ['./dialog-edit-organisation-todos.component.scss']
})
export class DialogEditOrganisationTodosComponent implements OnInit {

  organisation = new Organisation();
  organisationId: string;

  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationTodosComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

}
