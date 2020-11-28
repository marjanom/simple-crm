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
    if (authEvent.isAnonymous) {
      (await this.auth.currentUser).updateProfile({
        displayName: "Guest User",
        photoURL: "./assets/img/profile_female2.png"
      });
      // (await this.auth.currentUser).updateEmail('user@example.com');
    }

    await this.checkUserData(authEvent);
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
  checkUserProperties(fetchedUser: any) {
    if (fetchedUser.lastName == undefined) {
      this.updateFSUserEntry(fetchedUser);
      this.updateUser();
    }
  }

  /**
   * Update user-entry in Firestore creating a new User-object w/ custom properties and assign fetched data from Firebase Auth
   * @param fetchedUser : JSON-object containing auth-data gathered by Firebase
   */
  updateFSUserEntry(fetchedUser) {
    this.user = new User();
    this.updateName(fetchedUser);
    this.user.email = fetchedUser.email;
    this.user.uid = fetchedUser.uid;
    this.user.providerId = fetchedUser.providerId;
    this.updatePhotoUrl(fetchedUser);
    this.user.registeredUser = true;

  }

  /**
   * Updates displayName and sets firstName to displayName in Firestore collection
   * @param fetchedUser : JSON-object containing auth-data gathered by Firebase
   */
  updateName(fetchedUser: any) {
    this.user.displayName = fetchedUser.displayName;
    if (this.user.displayName !== '') (this.user.firstName = this.user.displayName);
  }

/**
 * Updates photoUrl in Firebase auth & Firestore collection; sets defaultPhotoUrl if none 
 * @param fetchedUser : JSON-object containing auth-data gathered by Firebase
 */
  async updatePhotoUrl(fetchedUser: any) {
    let photoUrlExists = fetchedUser.photoURL !== ('' || null);
    if (!photoUrlExists) {
      this.user.photoURL = this.defaultPhotoUrl;
      (await this.auth.currentUser).updateProfile({
        photoURL: this.defaultPhotoUrl
      });
    } else {
      this.user.photoURL = fetchedUser.photoURL;
    }
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
