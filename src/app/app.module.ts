import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';


import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
//import { faFacebookSquare } from '@fortawesome/free-brand-svg-icons';


import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { StartComponent } from './components/start/start.component';
import { LoginComponent } from './components/login/login.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { DataProtectionComponent } from './components/data-protection/data-protection.component';
import { TrusticonsComponent } from './components/trusticons/trusticons.component';
import { OrganisationDetailComponent } from './components/organisation-detail/organisation-detail.component';


import { DialogAddUserComponent } from './dialogs/dialogs-add/dialog-add-user/dialog-add-user.component';
import { DialogAddOrganisationComponent } from './dialogs/dialogs-add/dialog-add-organisation/dialog-add-organisation.component';

import { DialogEditAddressComponent } from './dialogs/dialogs-edit/dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialogs/dialogs-edit/dialog-edit-user/dialog-edit-user.component';
import { DialogEditOrganisationComponent } from './dialogs/dialogs-edit/dialog-edit-organisation/dialog-edit-organisation.component';
import { DialogEditOrganisationTodosComponent } from './dialogs/dialogs-edit/dialog-edit-organisation-todos/dialog-edit-organisation-todos.component';
import { DialogEditUserTodosComponent } from './dialogs/dialogs-edit/dialog-edit-user-todos/dialog-edit-user-todos.component';
import { DialogEditOrganisationUsersComponent } from './dialogs/dialogs-edit/dialog-edit-organisation-users/dialog-edit-organisation-users.component';
import { DialogEditOrganisationAdminsComponent } from './dialogs/dialogs-edit/dialog-edit-organisation-admins/dialog-edit-organisation-admins.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    UserDetailComponent,
    StartComponent,
    LoginComponent,
    OrganisationComponent,
    OrganisationDetailComponent,
    FooterComponent,
    ImprintComponent,
    DataProtectionComponent,
    TrusticonsComponent,
    DialogAddUserComponent,
    DialogAddOrganisationComponent,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    DialogEditOrganisationComponent,
    DialogEditOrganisationTodosComponent,
    DialogEditUserTodosComponent,
    DialogEditOrganisationUsersComponent,
    DialogEditOrganisationAdminsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatPasswordStrengthModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FontAwesomeModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase, () => 'Simple-CRM', environment.ngxAuthfirebaseUIConfig),
    DragDropModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
