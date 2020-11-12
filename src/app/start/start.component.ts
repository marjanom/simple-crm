import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  user: User;
  user$: Observable<User | null>;


  constructor(public afa: AngularFireAuth) {  }
  

  ngOnInit(): void {

    
  console.log('afa.user', this.afa.user);
    // this.user$ = this.afa.user;
    
    // console.log(this.user$);
    
  }

}
