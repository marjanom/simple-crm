import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';
//var isEqual = require('lodash.isequal');
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog-edit-organisation-admins',
  templateUrl: './dialog-edit-organisation-admins.component.html',
  styleUrls: ['./dialog-edit-organisation-admins.component.scss']
})
export class DialogEditOrganisationAdminsComponent implements OnInit {

  organisation = new Organisation();
  organisationId: string;
  loading = false;
  //usersIn: any[];
  //usersOut:any [];
  adminsIn = [];
  adminsOut = [];
  //selectedUsersToAdd: any[];
  //selectedUsersToRemove: any[];
   selectedAdminsToAdd: any[];
  selectedAdminsToRemove: any[];
  
  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationAdminsComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges()
    .subscribe((changes: any) => {
      console.log('Received changes from DB', changes);
      //this.usersOut = this.getUsersOut(changes);
      this.adminsOut = this.getAdminsOut(changes);
      //console.log("Users In: ",this.usersIn,"Users Out: ", this.usersOut);
      console.log("Admins In: ",this.adminsIn,"Admins Out: ", this.adminsOut);
    });
  }

  getAdminsOut(colection: any[]){
    return colection.filter((admin) => {
      console.log(this.isInside(admin));
      return admin.registeredUser && !this.isInside(admin);
     
    });
  }

  isInside(admin: any): boolean{
    return this.adminsIn.find(adminIn =>{
      return _.isEqual(adminIn, admin);
    });
  }

  saveChanges(){
    this.dialogRef.close();
  }

}
