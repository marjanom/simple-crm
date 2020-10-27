import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;


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
