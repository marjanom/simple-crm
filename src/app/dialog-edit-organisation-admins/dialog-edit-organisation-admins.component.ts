import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';
//var isEqual = require('lodash.isequal');
import * as _ from 'lodash';
import * as firebase from 'firebase/compat';

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
      .subscribe(async (changes: any) => {
        // console.log('Received changes from DB', changes);
        this.adminsOut = this.getAdminsOut(changes);
        // console.log("Admins In: ", this.adminsIn, "Admins Out: ", this.adminsOut);
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
      // console.log("Selected Admins Ids to Add: ", this.selectedAdminsToAdd);
      await this.addAdmins(this.selectedAdminsToAdd);
      await this.updateUsersTodos(this.selectedAdminsToAdd);
    }

    if (this.selectedAdminsToRemove) {
      //TODO: remove Organisation Todos
      // console.log("Selected Admins Ids to Remove: ", this.selectedAdminsToRemove);
      //let idsToRemove = this.getIdsToRemove(this.selectedAdminsToRemove);
      await this.removeAdmins(this.selectedAdminsToRemove);
      await this.removeUsersTodos(this.selectedAdminsToRemove);
    }

    this.loading = false;
    this.dialogRef.close();
  }

  async addAdmins(adminIds: any[]) {
    await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .update({ /*admins: firebase.firestore.FieldValue.arrayUnion(...adminIds) */});
  }

  async updateUsersTodos(userIds: any[]) {
    userIds.forEach(async (userId) => {
      await this.firestore
        .collection('users')
        .doc(userId)
        .update({ /*todos: firebase.firestore.FieldValue.arrayUnion(...this.organisation.todos) */});
    });
  }

  async removeUsersTodos(userIds: any[]) {
    userIds.forEach(async (userId) => {
      let adminToChangeTodos = this.adminsIn.find(adminIn => {
        return adminIn.customIdName == userId;
      });
      let newTodos = adminToChangeTodos.todos.filter((todo: any) => {
        return todo.customIdName != this.organisationId;
      });
      await this.firestore
        .collection('users')
        .doc(userId)
        .set({
            todos: newTodos
        }, {merge: true});
        //.update({ todos: firebase.firestore.FieldValue.arrayRemove(...this.organisation.todos) });
    });
  }

  async removeAdmins(adminIds: any[]) {
    await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .update({ /*admins: firebase.firestore.FieldValue.arrayRemove(...adminIds) */});
  }
}