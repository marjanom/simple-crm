import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from 'src/models/organisation.class';
import { User } from 'src/models/user.class';

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
    this.route.paramMap.subscribe(paramMap => {
      this.organisationId = paramMap.get('id');
      console.log('GOT ID', this.organisationId);
      this.getOrganisation();
    });
  }

  getAdmins() {
    if (this.organisationId) {
      this.organisation.admins.forEach(adminId => {
        this.firestore
          .collection('users')
          .doc(adminId)
          .valueChanges()
          .subscribe((admin: any) => {
            this.admins.push(admin);
          });
      });
      console.log('Retrieved admins', this.admins);
    }
  }

  getUsers() {
    if (this.organisationId) {
      this.organisation.users.forEach(userId => {
        this.firestore
          .collection('users')
          .doc(userId)
          .valueChanges()
          .subscribe((user: any) => {
            this.users.push(user);
          });
      });
      console.log('Retrieved users', this.users);
    }
  }


  getOrganisation() {
    if (this.organisationId) {
      this.firestore
        .collection('organisations')
        .doc(this.organisationId)
        .valueChanges()
        .subscribe((organisation: any) => {
          this.organisation = new Organisation(organisation);
          console.log('Retrieved organisation', this.organisation);
          this.getAdmins();
          this.getUsers();
        });
    }
  }

  editAdmins() {
    // const dialog = this.dialog.open(DialogEditAdmins);
    // dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    // dialog.componentInstance.organisationId = this.organisationId;
  }


  editOrganisationDetail() {
    // const dialog = this.dialog.open(DialogEditDetails);
    // dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    // dialog.componentInstance.organisationId = this.organisationId;
  }

  editTodos() {
    // const dialog = this.dialog.open(DialogEditTodos);
    // dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    // dialog.componentInstance.organisationId = this.organisationId;
  }

  editUsers() {
    // const dialog = this.dialog.open(DialogEditUsers);
    // dialog.componentInstance.organisation = new Organisation(this.organisation.toJSON());
    // dialog.componentInstance.organisationId = this.organisationId;
  }

}
