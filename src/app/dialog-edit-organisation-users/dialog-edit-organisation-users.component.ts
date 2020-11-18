import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';
//var isEqual = require('lodash.isequal');
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog-edit-organisation-users',
  templateUrl: './dialog-edit-organisation-users.component.html',
  styleUrls: ['./dialog-edit-organisation-users.component.scss']
})
export class DialogEditOrganisationUsersComponent implements OnInit {

  organisation = new Organisation();
  organisationId: string;
  loading = false;
  usersIn: any[];
  usersOut:any [];
  adminsIn = [];
  // adminsOut = [];
  selectedUsersToAdd: any[];
  selectedUsersToRemove: any[];
  // selectedAdminsToAdd: any[];
  // selectedAdminsToRemove: any[];
  
  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationUsersComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges()
    .subscribe((changes: any) => {
      console.log('Received changes from DB', changes);
      this.usersOut = this.getUsersOut(changes);
      //this.adminsOut = this.getAdminsOut(changes);
      console.log("Users In: ",this.usersIn,"Users Out: ", this.usersOut);
      //console.log("Admins In: ",this.adminsIn,"Admins Out: ", this.adminsOut);
    });
  }

  getUsersOut(colection: any[]){
    return colection.filter((user) => {
      console.log(this.isInside(user));
      return !(user.registeredUser || this.isInside(user));
     
    });
  }

  isInside(user: any): boolean{
    return this.usersIn.find(userIn =>{
      return _.isEqual(userIn, user);
    });
  }

  saveChanges(){
    this.dialogRef.close();
  }

}
