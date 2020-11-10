import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  openDrawer = true;


  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.checkForStartPage();
});
  }

  ngOnInit() {
    this.checkForStartPage();


  }


  /**
   * Checks if the current page is the landing or registration page. If yes, certain elements will be hidden
   */
  private checkForStartPage() {
    let url = window.location.href;
    this.openDrawer = !url.includes('start') && !url.includes('login') ;
  }

}
