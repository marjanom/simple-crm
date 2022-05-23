import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';
import { DialogAddOrganisationComponent } from '../dialog-add-organisation/dialog-add-organisation.component';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {

  organisation = new Organisation();
  allOrganisations: [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('organisations')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        // console.log('Received all Organisations changes from DB', changes);
        this.allOrganisations = changes;
      });
  }

  openDialog() {
    this.dialog.open(DialogAddOrganisationComponent);
  }

}
