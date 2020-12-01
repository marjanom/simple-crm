import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user-todos',
  templateUrl: './dialog-edit-user-todos.component.html',
  styleUrls: ['./dialog-edit-user-todos.component.scss']
})
export class DialogEditUserTodosComponent implements OnInit {

  user: User = new User();
  userId: string;
  loading = false;
  selectedTodos: any[];
  todoName: string;

  constructor(public dialogRef: MatDialogRef<DialogEditUserTodosComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  async saveChanges() {
    this.loading = true;

    if (this.todoName) {
      let newTodo = { name: this.todoName, done: false, customIdName: this.userId };
      // console.log("NEW TODO: ", newTodo);
      await this.updateUserTodos(newTodo);
    }

    if (this.selectedTodos) {
      // console.log(this.selectedTodos);
      await this.removeUserTodos(this.selectedTodos);
    }

    this.loading = false;
    this.dialogRef.close();
  }

  async updateUserTodos(todo: any) {
    await this.firestore
      .collection('users')
      .doc(this.userId)
      .update({ todos: firebase.firestore.FieldValue.arrayUnion(todo) });
  }

  async removeUserTodos(todos: any[]) {
    await this.firestore
      .collection('users')
      .doc(this.userId)
      .update({ todos: firebase.firestore.FieldValue.arrayRemove(...todos) });
  }
}
