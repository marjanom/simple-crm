import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
// import { firestore } from 'firebase';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers = [];


  constructor(public dialog: MatDialog,
     private firestore: AngularFirestore) { }

  filterFirstName(ref) : QueryFn{
     return ref.orderBy('firstName', 'asc');
  }

  ngOnInit(): void {

    this.firestore
      .collection('users', this.filterFirstName.bind(this)  )
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        // console.log('Received all Users changes from DB', changes);
        this.allUsers = changes;
      });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
