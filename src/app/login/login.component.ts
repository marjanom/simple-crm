import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faFacebookSquare, faGoogle } from '@fortawesome//free-brands-svg-icons';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  faFacebookSquare = faFacebookSquare;
  faGoogle = faGoogle;
  dashboardAccessible = false;

  providers = AuthProvider;
  message = "Congrats, this was successful!"
  errorMessage = "Oops, something went wrong! Please try again!"
  // user = new User();


  constructor(
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {

  }

  loginSuccessful(event) {
    // this.dashboardAccessible = true;
    window.location.href="/dashboard";
    
    console.log(event);
    

}

  printError(event) {
      console.error(event);
  }

}
