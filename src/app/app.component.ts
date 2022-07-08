import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer;
  title = "simple-crm";
  readonly MOBILE_BREAKPOINT = 850;
  /**TODO */
  isAnonymous: boolean;

  constructor(
    public router: Router,
    public auth: AngularFireAuth
  ) {}

  ngAfterViewInit(): void {
    this.router.events.subscribe(() => this.adaptDrawerMode(this.drawer))
  }

  /*** Change drawer & drawer-container style based on URL & clientWidth */
  /*** Checks if the current page is the landing or login page. If yes, certain elements will be hidden */
  adaptDrawerMode(drawer : MatDrawer) {
    drawer.mode = this.getDrawerMode();
  }

  getDrawerMode(){
    return this.hasClientMobileWidth() ? "over" : "side";
  }

  canOpenDrawer(){
    return !(this.isLandingPage() || this.hasClientMobileWidth());
  }

  /*** Remove padding from router-container, if in mobile view on landing & login pages */
  // indicates if landing page is shown in mobile view
  isMobileLP() {
    return this.hasClientMobileWidth() && this.isLandingPage();
  }

  isLandingPage() {
    console.log(this.router.url);
    return this.router.url.includes('start') || this.router.url.includes('login');
  }

  hasClientMobileWidth() {
    let clientWidth = window.innerWidth;
    return clientWidth <= this.MOBILE_BREAKPOINT;
  }

  lockAccess() {
    window.location.reload();
  }
}
