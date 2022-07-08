import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { collections } from 'ngx-auth-firebaseui';
import { Organisation } from 'src/models/organisation.class';

@Component({
  selector: 'app-dialog-edit-organisation',
  templateUrl: './dialog-edit-organisation.component.html',
  styleUrls: ['./dialog-edit-organisation.component.scss']
})
export class DialogEditOrganisationComponent implements OnInit {

  organisation = new Organisation();
  organisationId: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  async saveChanges(){
    this.loading = true;

    await this.firestore
    .collection('organisations')
    .doc(this.organisationId)
    .set({
      name: this.organisation.name
    }, { merge: true});

    this.loading = true;
    this.dialogRef.close();
  }

}
