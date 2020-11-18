import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { StartComponent } from './start/start.component';
import { LoginComponent } from './login/login.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { OrganisationComponent } from './organisation/organisation.component';
import { DialogAddOrganisationComponent } from './dialog-add-organisation/dialog-add-organisation.component';
import { OrganisationDetailComponent } from './organisation-detail/organisation-detail.component';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { DialogEditOrganisationComponent } from './dialog-edit-organisation/dialog-edit-organisation.component';
import { DialogEditOrganisationTodosComponent } from './dialog-edit-organisation-todos/dialog-edit-organisation-todos.component';
import { FooterComponent } from './footer/footer.component';
import { DialogEditUserTodosComponent } from './dialog-edit-user-todos/dialog-edit-user-todos.component';
import { DialogEditOrganisationUsersComponent } from './dialog-edit-organisation-users/dialog-edit-organisation-users.component';
import { DialogEditOrganisationAdminsComponent } from './dialog-edit-organisation-admins/dialog-edit-organisation-admins.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DialogAddUserComponent,
    UserDetailComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    StartComponent,
    LoginComponent,
    OrganisationComponent,
    DialogAddOrganisationComponent,
    OrganisationDetailComponent,
    DialogEditOrganisationComponent,
    DialogEditOrganisationTodosComponent,
    FooterComponent,
    DialogEditUserTodosComponent,
    DialogEditOrganisationUsersComponent,
    DialogEditOrganisationAdminsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, () => 'Simple-CRM', environment.ngxAuthfirebaseUIConfig),
    MatPasswordStrengthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
