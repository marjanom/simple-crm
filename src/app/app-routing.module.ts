import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { OrganisationDetailComponent } from './organisation-detail/organisation-detail.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { ImprintComponent } from './imprint/imprint.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';


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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
