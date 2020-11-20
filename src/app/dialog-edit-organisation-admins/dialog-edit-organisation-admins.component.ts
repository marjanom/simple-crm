import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';
//var isEqual = require('lodash.isequal');
import * as _ from 'lodash';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dialog-edit-organisation-admins',
  templateUrl: './dialog-edit-organisation-admins.component.html',
  styleUrls: ['./dialog-edit-organisation-admins.component.scss']
})
export class DialogEditOrganisationAdminsComponent implements OnInit {

  organisation = new Organisation();
  organisationId: string;
  loading = false;
  adminsIn = [];
  adminsOut = [];
  selectedAdminsToAdd: any[];
  selectedAdminsToRemove: any[];

  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationAdminsComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        this.adminsOut = this.getAdminsOut(changes);
        console.log("Admins In: ", this.adminsIn, "Admins Out: ", this.adminsOut);
      });
  }

  getAdminsOut(colection: any[]) {
    return colection.filter((admin) => {
      return admin.registeredUser && !this.isInside(admin);
    });
  }

  isInside(admin: any): boolean {
    return this.adminsIn.find(adminIn => {
      return _.isEqual(adminIn, admin);
    });
  }

  async saveChanges() {
    this.loading = true;
    if (this.selectedAdminsToAdd) {
      //TODO: add Organisation Todos
      console.log(this.selectedAdminsToAdd);
      await this.addAdmins(this.selectedAdminsToAdd);
    }

    if (this.selectedAdminsToRemove) {
      //TODO: add Organisation Todos
      console.log(this.selectedAdminsToRemove);
      await this.removeAdmins(this.selectedAdminsToRemove);
    }

    console.log("NEW ADMINS LIST: ", this.organisation.admins);
    this.loading = false;
    this.dialogRef.close();
  }

  async addAdmins(adminIds: any[]) {
    await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .update({ admins: firebase.firestore.FieldValue.arrayUnion(...adminIds) });
  }

  async removeAdmins(adminIds: any[]) {
    await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .update({ admins: firebase.firestore.FieldValue.arrayRemove(...adminIds) });
  }

}
