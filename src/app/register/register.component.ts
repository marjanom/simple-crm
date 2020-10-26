import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faFacebookSquare, faGoogle } from '@fortawesome//free-brands-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  faFacebookSquare = faFacebookSquare;
  faGoogle = faGoogle;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please enter an email';
    }

    return this.email.hasError('email') ? 'Please enter a valid email' : '';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
