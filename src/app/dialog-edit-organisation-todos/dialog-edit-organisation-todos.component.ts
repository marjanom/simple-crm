import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';

@Component({
  selector: 'app-dialog-edit-organisation-todos',
  templateUrl: './dialog-edit-organisation-todos.component.html',
  styleUrls: ['./dialog-edit-organisation-todos.component.scss']
})
export class DialogEditOrganisationTodosComponent implements OnInit {

  organisation = new Organisation();
  organisationId: string;
  todoName: string;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationTodosComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

  async saveTodo() {
    this.loading = true;
    console.log("Add Todo " + this.todoName + " to organisation todo list");
    let newTodo = { name: this.todoName, done: false };
    this.organisation.todos.push(newTodo);
    await this.updateOrganisationTodos();
    await this.updateAdminsTodos();
    await this.updateUsersTodos();
    this.loading = false;
    this.dialogRef.close();
  }

  async updateOrganisationTodos() {
      this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .set({
        todos: this.organisation.todos
      }, { merge: true });
  }

  async updateAdminsTodos() {
    this.organisation.admins.forEach(adminId => {
      this.firestore
        .collection('users')
        .doc(adminId)
        .set({
          todos: this.organisation.todos
        }, { merge: true });
    });
  }

  async updateUsersTodos() {
    this.organisation.users.forEach(userId => {
      this.firestore
        .collection('users')
        .doc(userId)
        .set({
          todos: this.organisation.todos
        }, { merge: true });
    });
  }

}
