import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dashboardAccessible = false;

  providers = AuthProvider;
  // message = "Congrats, this was successful!"
  // errorMessage = "Oops, something went wrong! Please try again!"
  user: User;
  userId: string;

  constructor(
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {

  }

  /**
   * 
   * @param authEvent - JSON-object containing data of Firebase auth-event
   */
   loginSuccessful(authEvent: any) {

    this.checkUserData(authEvent);
    // redirect to dashboard when login successful
    // window.location.href="/dashboard";  
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

    // Check if fetched user data already contain custom properties
    if (fetchedUser.lastName == undefined) {
      this.adaptUserEntry(fetchedUser);
      this.updateUser();
    }    
   })
}

/**
 * Create new User-object w/ custom properties and assign fetched auth-data 
 * @param fetchedUser : JSON-object containing auth-data gathered by Firebase
 */
adaptUserEntry(fetchedUser) {
    this.user = new User();
    this.user.displayName = fetchedUser.displayName;
    this.user.email = fetchedUser.email;
    // this.user.emailVerified = fetchedUser.emailVerified;
    this.user.uid = fetchedUser.uid;
    this.user.providerId = fetchedUser.providerId;
    this.user.photoURL = fetchedUser.photoURL;
    this.user.displayName = fetchedUser.displayName;
    if (this.user.displayName !== '') (this.user.firstName = this.user.displayName)
    // console.log('user', this.user);
    
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
        .then(() => {
          // console.log('User updated successfully');
        });
      } else {
        // console.log('User update failed!');
      }
      
}


  printError(event) {
      console.error('Error detected', event);
  }

}
