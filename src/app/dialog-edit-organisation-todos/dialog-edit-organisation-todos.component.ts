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
    
    if (this.todoName) {
      let newTodo = { name: this.todoName, done: false };
      console.log("NEW TODO: ", newTodo);
      await this.updateOrganisationTodos(newTodo);
      await this.updateAdminsTodos(newTodo);
      await this.updateUsersTodos(newTodo);
    }

    if (this.selectedTodos) {
      console.log(this.selectedTodos);
      await this.removeAdminsTodos(this.selectedTodos);
      await this.removeUsersTodos(this.selectedTodos);
      await this.removeOrganisationTodos(this.selectedTodos);
      // this.selectedTodos.forEach( (todo) => {
      //   let todoIndex = this.organisation.todos.indexOf(todo);
      //   this.organisation.todos.splice(todoIndex, 1);
      // });
    }

    console.log("NEW TODO LIST: ", this.organisation.todos);
    this.loading = false;
    this.dialogRef.close();
  }

  async removeAdminsTodos(todos: any[]) {
    this.organisation.admins.forEach(async (adminId) => {
      await this.firestore
        .collection('users')
        .doc(adminId)
        .update({
          todos: firebase.firestore.FieldValue.arrayRemove(...todos)
        });
    });
  }

  async removeUsersTodos(todos: any[]) {
    this.organisation.users.forEach(async (userId) => {
     await this.firestore
        .collection('users')
        .doc(userId)
        .update({
          todos: firebase.firestore.FieldValue.arrayRemove(...todos)
        });
    });
  }



  async removeOrganisationTodos(todos: any[]) {
   await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .update({
        todos: firebase.firestore.FieldValue.arrayRemove(...todos)
      });
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

  async updateOrganisationTodos(todo: any){
    await this.firestore
      .collection('organisations')
      .doc(this.organisationId)
      .update({
        todos: firebase.firestore.FieldValue.arrayUnion(todo)
      });
  }

}
