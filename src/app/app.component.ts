import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  openDrawer = true;
  isLandingPage = false;
  isMobile = false; // indicates if mobile screen detected
  isMobileLP = false; // indicates if landing page is shown in mobile view
  isLoggedIn = false;
  drawerMode = "side";  // indicates current drawer-mode ('side' for wide screens, 'over' for mobile devices)
  isAnonymous: boolean;

  constructor(
    private router: Router,
    public auth: AngularFireAuth
    ) {
    router.events.subscribe(() => {
      this.checkForStartPage();

      this.auth.user.subscribe((user) => {
        this.isLoggedIn = !!user;
        // if (this.isLoggedIn) (this.isAnonymous = user.isAnonymous);
      });
    })
  }


  ngOnInit() {
    this.checkForStartPage();
  }


  // async deleteGuestAccount() {
  //   (await this.auth.currentUser).delete();
  //   console.log('deleted');
    
  // }


  /**
   * Checks if the current page is the landing or login page. If yes, certain elements will be hidden
   */
  @HostListener('window:resize')
  private checkForStartPage() {
    let url = window.location.href;
    let clientWidth = window.innerWidth;

    if (url.includes('start') || url.includes('login')) {
      this.isLandingPage = true; 
    } else {
      this.isLandingPage = false;
    }
    
    this.adaptDrawer();
    this.adaptRouterContainer(clientWidth);
  }

/**
 * Change drawer & drawer-container style based on URL & clientWidth
 */
  adaptDrawer() {
    let url = window.location.href;
    let clientWidth = window.innerWidth;
    if (clientWidth > 850) {
      this.openDrawer = !url.includes('start') && !url.includes('login') ;
      this.isMobile = false;
      this.drawerMode = "side";
    } else {
      this.openDrawer = false;
      this.isMobile = true;
      this.drawerMode = "over";
    }
  }

  /**
   * Remove padding from router-container, if in mobile view on landing & login pages
   * @param clientWidth - inner width of client device
   */
  adaptRouterContainer(clientWidth){
    if (clientWidth <= 850 && this.isLandingPage) {
      this.isMobileLP = true;
    } else {
      this.isMobileLP = false;
    }
  }

  lockAccess() {
    // if (this.isAnonymous) (this.deleteGuestAccount());
    console.log('logged out');
    window.location.reload();
  }
}
