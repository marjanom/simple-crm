import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { StartComponent } from './start/start.component';
import { RegisterComponent } from './register/register.component';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { OrganisationDetailComponent } from './organisation-detail/organisation-detail.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'start', component: StartComponent },
  { path: 'organisation', component: OrganisationComponent},
  { path: 'organisation/:id', component: OrganisationDetailComponent},
  { path: 'user', component: UserComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'register/email', component: RegisterEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
