import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { Organisation } from 'src/models/organisation.class';

@Component({
  selector: 'app-dialog-add-organisation',
  templateUrl: './dialog-add-organisation.component.html',
  styleUrls: ['./dialog-add-organisation.component.scss']
})
export class DialogAddOrganisationComponent implements OnInit {

  organisation = new Organisation();
  allUsers: any[];
  allAdmins: any[];
  loading = false;
  selectedAdmins: [];
  selectedUsers: [];

  constructor(public dialogRef: MatDialogRef<DialogAddOrganisationComponent>, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('Received changes from DB', changes);
        //this.allUsers = changes;
        this.allAdmins = this.getAdmins(changes);
        this.allUsers = this.getUsers(changes);
        console.log(this.allUsers, this.allAdmins);
      });
  }

  getAdmins(colection: any[]): any[] {
    return colection.filter((user) => {
      return user.registeredUser;
    });
  }

  getUsers(colection: any[]): any[] {
    return colection.filter((user) => {
      return !user.registeredUser;
    });
  }


  async saveOrganisation() {
    this.organisation.admins = this.selectedAdmins ? this.selectedAdmins : [];
    this.organisation.users = this.selectedUsers ? this.selectedUsers : [];
    console.log('Current Organisation is', this.organisation);
    this.loading = true;

    if (this.selectedAdmins) {
      this.selectedAdmins.forEach(async (adminId) => {
        await this.updateUserTodos(adminId);
      });
    }

    if (this.selectedUsers) {
      this.selectedUsers.forEach(async (userId) => {
        await this.updateUserTodos(userId);
      });
    }

    await this.firestore
      .collection('organisations')
      .add(this.organisation.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding organisation finsihed', result);
        this.dialogRef.close();
      });
  }

  async updateUserTodos(id: any) {
    await this.firestore
      .collection('users')
      .doc(id)
      .update({
        todo: firebase.firestore.FieldValue.arrayUnion(...this.organisation.todos)
      });
  }
}