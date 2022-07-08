import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { StartComponent } from './components/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { OrganisationDetailComponent } from './components/organisation-detail/organisation-detail.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { ImprintComponent } from './components/imprint/imprint.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';


const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
  { path: 'start', component: StartComponent },
  { path: 'organisation', component: OrganisationComponent, canActivate: [LoggedInGuard]},
  { path: 'organisation/:name', component: OrganisationDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'user', component: UserComponent, canActivate: [LoggedInGuard] },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'imprint', component: ImprintComponent},
  { path: 'data-protection', component: DataProtectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
