import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/models/organisation.class';
import * as firebase from 'firebase/app';

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
  selectedTodos: any[];

  constructor(public dialogRef: MatDialogRef<DialogEditOrganisationTodosComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

  async saveTodo() {
    this.loading = true;
    //console.log("Add Todo " + this.todoName + " to organisation todo list");
    if (this.todoName) {
      let newTodo = { name: this.todoName, done: false };
      this.organisation.todos.push(newTodo);
      await this.updateAdminsTodos(newTodo);
      await this.updateUsersTodos(newTodo);
    }

    if (this.selectedTodos) {
      //console.log(this.selectedTodos);
      this.selectedTodos.forEach(async (todo) => {
        let todoIndex = this.organisation.todos.indexOf(todo);
        console.log("Removed Todo From Organisation: ", this.organisation.todos.splice(todoIndex, 1));
        await this.removeAdminsTodo(todo);
        await this.removeUsersTodo(todo);
      });
    }

    await this.updateOrganisationTodos();
    console.log("NEW TODO LIST: ", this.organisation.todos);
    this.loading = false;
    this.dialogRef.close();
  }

  async removeAdminsTodo(todo: any) {
    this.organisation.admins.forEach(async (adminId) => {
      await this.firestore
        .collection('users')
        .doc(adminId)
        .update({
          todos: firebase.firestore.FieldValue.arrayRemove(todo)
        });
    });
  }

  async removeUsersTodo(todo: any) {
    this.organisation.users.forEach(async (userId) => {
     await this.firestore
        .collection('users')
        .doc(userId)
        .update({
          todos: firebase.firestore.FieldValue.arrayRemove(todo)
        });
    });
  }

  async updateOrganisationTodos() {
   await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .set({
        todos: this.organisation.todos
      }, { merge: true });
  }

  async updateAdminsTodos(todo: any) {
    this.organisation.admins.forEach(async (adminId) => {
     await this.firestore
        .collection('users')
        .doc(adminId)
        .update({
          todos: firebase.firestore.FieldValue.arrayUnion(todo)
        });
    });
  }

  async updateUsersTodos(todo: any) {
    this.organisation.users.forEach(async (userId) => {
      await this.firestore
        .collection('users')
        .doc(userId)
        .update({
          todos: firebase.firestore.FieldValue.arrayUnion(todo)
        });
    });
  }

}
