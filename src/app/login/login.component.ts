import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//import { auth } from 'firebase';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dashboardAccessible = false;

  providers = AuthProvider;
  user: User;
  userId: string;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {

  }

  /**
   * Check & update user-data & redirect, if login successful
   * @param authEvent - JSON-object containing data of Firebase auth-event
   */
  async loginSuccessful(authEvent: any) {
    console.log(authEvent);
    if (authEvent.isAnonymous) {
      console.log("IS ANONYMOUS");
      (await this.auth.currentUser).updateProfile({
        displayName: "Guest User"
      });
      (await this.auth.currentUser).updateEmail('user@example.com');
      // firebase.initializeApp(environment.firebase);
      //  firebase.auth().currentUser.updateProfile({
      //     displayName: "Guest User"
      //  });

      // firebase.auth().currentUser.updateEmail("user@example.com");
    }
    this.checkUserData(authEvent);
    // redirect to user-list, if login successful  
    this.router.navigate(['/user']);
  }


  /**
   * Fetch auth-data for logged-in user; 
   * Extend user-entry with custom property fields, if it only contains FirebaseAuth-data
   * @param authEvent - JSON-object containing data of Firebase auth-event
   */
  checkUserData(authEvent) {
    this.userId = authEvent.uid;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .ref.get()
      .then((doc) => {
        let fetchedUser = doc.data();
        this.checkFetchedUser(fetchedUser);
      })
  }

  /**
   * Check fetched data to decide about update or delete of user-entry
   * @param fetchedUser Data of fetched Firestore-document
   */
  checkFetchedUser(fetchedUser: any) {
    // Check if user is anonymous
    if (fetchedUser.email === null) {
      this.deleteAnonymUser();
    } else {
      this.checkUserProperties(fetchedUser);
    }
  }


  deleteAnonymUser() {
    this.firestore.collection('users')
      .doc(this.userId).delete();
  }

  /**
   * Check if fetched user data already contain custom properties; if not, add properties and update user-entry
   * @param fetchedUser Data of fetched Firestore-document
   */
  checkUserProperties(fetchedUser: any) {
    if (fetchedUser.lastName == undefined) {
      this.adaptUserEntry(fetchedUser);
      this.updateUser();
    }
  }

  /**
   * Create new User-object w/ custom properties and assign fetched auth-data 
   * @param fetchedUser : JSON-object containing auth-data gathered by Firebase
   */
  adaptUserEntry(fetchedUser) {

    this.user = new User();
    this.user.displayName = fetchedUser.displayName;
    this.user.email = fetchedUser.email;
    this.user.uid = fetchedUser.uid;
    this.user.providerId = fetchedUser.providerId;
    this.user.photoURL = fetchedUser.photoURL;
    if (this.user.photoURL === '') (this.user.photoURL = 'src/assets/img/user/account.svg');
    this.user.displayName = fetchedUser.displayName;
    if (this.user.displayName !== '') (this.user.firstName = this.user.displayName);
    this.user.registeredUser = true;

  }

  /**
   * Upload new User-object to Firestore to make custom user-properties accessible 
   */
  updateUser() {
    if (this.userId) {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .update(this.user.toJSON())
    }

  }


  printError(event) {
    console.error('Error detected', event);
  }

}
