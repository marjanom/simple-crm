import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss', './start.component.responsive.scss']
})
export class StartComponent implements OnInit {
  isLoggedIn = true;

  constructor(public afa: AngularFireAuth) {
    this.afa.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
    }
  


  ngOnInit(): void {
    
  }

  scrollTo(anchorId: string): void {
    document.getElementById(anchorId).scrollIntoView({ behavior: "smooth"});
  }

}
