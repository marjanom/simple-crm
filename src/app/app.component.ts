import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  openDrawer = true;

  ngOnInit() {
    this.checkForStartPage();
  }


  /**
   * Checks if the current page is the landing page. If yes, certain elements will be hidden
   */
  private checkForStartPage() {
    let url = window.location.href;
    this.openDrawer = !url.endsWith('start');
  }

}
