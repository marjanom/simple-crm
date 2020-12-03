import { Component, OnInit } from '@angular/core';
import { AuthProcessService, AuthProvider } from 'ngx-auth-firebaseui';
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
  defaultPhotoUrl = './assets/img/profile_female2.png';


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
    if (authEvent.isAnonymous) (this.setGuestUser());
    await this.processUserData(authEvent);

    this.router.navigate(['/user']);
  }

  /**
   * Apply Guest User properties to current user
   */
   async setGuestUser() {
      (await this.auth.currentUser).updateProfile({
        displayName: "Guest User",
        photoURL: "./assets/img/profile_female2.png"
      });
   }


  /**
   * Fetch auth-data for logged-in user; 
   * Extend user-entry with custom property fields, if it only contains FirebaseAuth-data
   * @param authEvent - JSON-object containing data of Firebase auth-event
   */
  processUserData(authEvent: any) {
    this.userId = authEvent.uid;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .ref.get()
      .then((doc) => {
        let fetchedUser = doc.data();
        this.processUserEntry(fetchedUser, authEvent);
      })
  }

  /**
   * Check fetched user data to decide about update or delete of user-entry
   * @param fetchedUser Data of fetched Firestore-document
   */
  processUserEntry(fetchedUser: any, authEvent: any) {
    if (authEvent.isAnonymous) (this.deleteAnonymUser());
    else (this.checkCustomProperties(fetchedUser));
  }


/**
 * Delete entry in Firestore-collection, if user is anonymous (due to guest login)
 */
deleteAnonymUser() {
    this.firestore.collection('users')
      .doc(this.userId).delete();
  }


  /**
   * Check if fetched user data already contain custom properties; if not, add properties and update user-entry
   * @param fetchedUser Data of fetched Firestore-document
   */
  checkCustomProperties(fetchedUser: any) {
    if (fetchedUser.lastName == undefined) {
      this.compileNewUserEntry(fetchedUser);
      this.uploadUserEntry();
    }
  }

  /**
   * Update user-entry in Firestore creating a new User-object w/ custom properties and assign fetched data from Firebase Auth
   * @param fetchedUser : JSON-object containing auth-data gathered by Firebase
   */
  compileNewUserEntry(fetchedUser: any) {
    this.user = new User();
    this.setName(fetchedUser);
    this.user.email = fetchedUser.email;
    this.user.uid = fetchedUser.uid;
    this.user.providerId = fetchedUser.providerId;
    this.setPhotoUrl(fetchedUser);
    this.user.registeredUser = true;
  }

  /**
   * Updates displayName and sets firstName to displayName in Firestore collection
   * @param fetchedUser : JSON-object containing auth-data gathered by Firebase
   */
  setName(fetchedUser: any) {
    this.user.displayName = fetchedUser.displayName;
    if (this.user.displayName !== '') (this.user.firstName = this.user.displayName);
  }

/**
 * Updates photoUrl in Firebase auth & Firestore collection; sets defaultPhotoUrl if none 
 * @param fetchedUser : JSON-object containing auth-data gathered by Firebase
 */
  setPhotoUrl(fetchedUser: any) {
    let photoUrlExists = fetchedUser.photoURL !== ('' || null);
    if (!photoUrlExists) (this.setDefaultPhoto()) 
    else (this.user.photoURL = fetchedUser.photoURL);
  }

  /**
   * Set default photoURL
   */
  async setDefaultPhoto() {
    this.user.photoURL = this.defaultPhotoUrl;
    (await this.auth.currentUser).updateProfile({
      photoURL: this.defaultPhotoUrl
    });
  }


  /**
   * Upload new User-object to Firestore to make custom user-properties accessible 
   */
  uploadUserEntry() {
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
