import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';

@Component({
  selector: 'app-dialog-edit-organisation',
  templateUrl: './dialog-edit-organisation.component.html',
  styleUrls: ['./dialog-edit-organisation.component.scss']
})
export class DialogEditOrganisationComponent implements OnInit {

  organisation = new Organisation();
  organisationId: string;

  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

}
