import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from 'src/models/organisation.class';
import { User } from 'src/models/user.class';
import { DialogEditOrganisationAdminsComponent } from '../dialog-edit-organisation-admins/dialog-edit-organisation-admins.component';
import { DialogEditOrganisationTodosComponent } from '../dialog-edit-organisation-todos/dialog-edit-organisation-todos.component';
import { DialogEditOrganisationUsersComponent } from '../dialog-edit-organisation-users/dialog-edit-organisation-users.component';
import { DialogEditOrganisationComponent } from '../dialog-edit-organisation/dialog-edit-organisation.component';

@Component({
  selector: 'app-organisation-detail',
  templateUrl: './organisation-detail.component.html',
  styleUrls: ['./organisation-detail.component.scss']
})
export class OrganisationDetailComponent implements OnInit {

  organisationId = '';
  organisation = new Organisation();
  admins = [];
  users = [];

  constructor(private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (paramMap) => {
      this.organisationId = paramMap.get('name');
      // console.log('GOT ID', this.organisationId);
       this.getOrganisation();
    });
  }

   getAdmins() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe(changes => {
        this.admins = changes.filter((change) => {
          return this.organisation.admins.includes(change.customIdName);
        });
        // console.log("Retrieved Admins: ", this.admins);
      })
  }

   getUsers() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe(changes => {
        this.users = changes.filter((change) => {
          return this.organisation.users.includes(change.customIdName);
        });
        // console.log("Retrieved Users: ", this.users);
      })
  }

  // async getAdmins() {
  //   this.admins = [];
  //   this.organisation.admins.forEach(async (adminId) => {
  //     await this.firestore
  //       .collection('users')
  //       .doc(adminId).ref.get().then(doc => {
  //         this.admins.push(doc.data());
  //       });
  //   });
  //   console.log('Retrieved admins', this.admins);
  // }

  // async getUsers() {
  //   this.users = [];
  //   this.organisation.users.forEach(async (userId) => {
  //     await this.firestore
  //       .collection('users')
  //       .doc(userId).ref.get().then(doc => {
  //         this.users.push(doc.data());
  //       });
  //   });
  //   console.log('Retrieved users', this.users);
  // }

    getOrganisation() {
    this.firestore
       .collection('organisations')
       .doc(this.organisationId)
       .valueChanges()
       .subscribe((organisation) => {
         this.organisation = new Organisation(organisation);
         console.log('Retrieved Organisation', this.organisation);
         this.getAdmins();
         this.getUsers();
       });
  }

  editOrganisationDetail() {
    const dialog = this.dialog.open(DialogEditOrganisationComponent);
    dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    dialog.componentInstance.organisationId = this.organisationId;
  }

  //TODO
  deleteOrganisation() {
    // const dialog = this.dialog.open(DialogDeleteOrganisationComponent);
    // dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    // dialog.componentInstance.organisationId = this.organisationId;
  }

  editAdmins() {
    const dialog = this.dialog.open(DialogEditOrganisationAdminsComponent);
    dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    dialog.componentInstance.organisationId = this.organisationId;
    dialog.componentInstance.adminsIn = this.admins;
  }

  editUsers() {
    const dialog = this.dialog.open(DialogEditOrganisationUsersComponent);
    dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    dialog.componentInstance.organisationId = this.organisationId;
    dialog.componentInstance.usersIn = this.users;
  }

  editTodos() {
    const dialog = this.dialog.open(DialogEditOrganisationTodosComponent);
    dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    dialog.componentInstance.organisationId = this.organisationId;
    dialog.componentInstance.adminsIn = this.admins;
    dialog.componentInstance.usersIn = this.users;
  }
}
