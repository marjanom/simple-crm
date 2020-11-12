import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthProcessService } from 'ngx-auth-firebaseui';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  openDrawer = true;


  constructor(
    private router: Router
    ) {
    router.events.subscribe(() => {
      this.checkForStartPage();
});
  }

  ngOnInit() {
    this.checkForStartPage();

  }


  /**
   * Checks if the current page is the landing or login page. If yes, certain elements will be hidden
   */
  private checkForStartPage() {
    let url = window.location.href;
    this.openDrawer = !url.includes('start') && !url.includes('login') ;
  }


  lockAccess() {
    window.location.reload();
  }
}
