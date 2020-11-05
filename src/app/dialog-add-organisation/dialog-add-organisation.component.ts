import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';

@Component({
  selector: 'app-dialog-add-organisation',
  templateUrl: './dialog-add-organisation.component.html',
  styleUrls: ['./dialog-add-organisation.component.scss']
})
export class DialogAddOrganisationComponent implements OnInit {

  organisation = new Organisation();
  allUsers: [];
  loading = false;
  selectedAdmins: [];
  selectedUsers: [];

  constructor(public dialogRef: MatDialogRef<DialogAddOrganisationComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        this.allUsers = changes;
      });
  }


  saveOrganisation() {
    this.organisation.admins = this.selectedAdmins;
    this.organisation.users = this.selectedUsers;
    console.log('Current Organisation is', this.organisation);
    this.loading = true;
    this.firestore
      .collection('organisations')
      .add(this.organisation.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding organisation finsihed', result);
        this.dialogRef.close();
      });
  }

  openDialog() {

  }

}
