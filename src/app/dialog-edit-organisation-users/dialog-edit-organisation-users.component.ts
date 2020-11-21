import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';
//var isEqual = require('lodash.isequal');
import * as _ from 'lodash';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dialog-edit-organisation-users',
  templateUrl: './dialog-edit-organisation-users.component.html',
  styleUrls: ['./dialog-edit-organisation-users.component.scss']
})
export class DialogEditOrganisationUsersComponent implements OnInit {

  organisation = new Organisation();
  organisationId: string;
  loading = false;
  usersIn = [];
  usersOut = [];
  selectedUsersToAdd: any[];
  selectedUsersToRemove: any[];

  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationUsersComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('users')
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        this.usersOut = this.getUsersOut(changes);
        console.log("Users In: ", this.usersIn, "Users Out: ", this.usersOut);
      });
  }

  getUsersOut(colection: any[]) {
    return colection.filter((user) => {
      return !(user.registeredUser || this.isInside(user));
    });
  }

  isInside(user: any): boolean {
    return this.usersIn.find(userIn => {
      return _.isEqual(userIn, user);
    });
  }

  async saveChanges() {
    this.loading = true;

    if (this.selectedUsersToAdd) {
      console.log(this.selectedUsersToAdd);
      await this.addUsers(this.selectedUsersToAdd);
      await this.updateUsersTodos(this.selectedUsersToAdd);
    }

    if (this.selectedUsersToRemove) {
      //TODO: remove Organisation Todos
      console.log(this.selectedUsersToRemove);
      await this.removeUsers(this.selectedUsersToRemove);
      await this.removeUsersTodos(this.selectedUsersToRemove);
    }

    console.log("NEW ADMINS LIST: ", this.organisation.users);
    this.loading = false;
    this.dialogRef.close();
  }

  async addUsers(userIds: any[]) {
    await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .update({ users: firebase.firestore.FieldValue.arrayUnion(...userIds) });
  }

  async removeUsers(usersId: any[]) {
    await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .update({ users: firebase.firestore.FieldValue.arrayRemove(...usersId) });
  }

  async updateUsersTodos(userIds: any[]) {
    userIds.forEach(async (userId) => {
      await this.firestore
        .collection('users')
        .doc(userId)
        .update({ todos: firebase.firestore.FieldValue.arrayUnion(...this.organisation.todos) });
    });
  }

  //TODO: if user has todo done: true, will missmatch organisation todo and will not be removed
  async removeUsersTodos(userIds: any[]) {
    userIds.forEach(async (userId) => {
      await this.firestore
        .collection('users')
        .doc(userId)
        .update({ todos: firebase.firestore.FieldValue.arrayRemove(...this.organisation.todos) });
    });
  }
}
