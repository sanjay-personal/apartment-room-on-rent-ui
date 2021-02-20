import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { AngularTreeTableModule } from 'angular-tree-table';
import { ApartmentComponent } from './components/apartment/apartment.component';
import { TopbarComponent } from './components/layout/topbar/topbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginDirective } from './directive/login.directive';
import { AuthService } from './service/auth.service';
import { Token } from 'src/interceptor/token';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { AllowonlynumbersDirective } from './directive/allowonlynumbers.directive';
import { MaintenanceListComponent } from './components/maintenance/maintenance-list/maintenance-list.component';
import { ConsolidatedMaintenanceComponent } from './components/maintenance/consolidated-maintenance/consolidated-maintenance.component';


@NgModule({
  declarations: [
    AppComponent,
    ApartmentListComponent,
    ApartmentComponent,
    TopbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    LoginDirective,
    MaintenanceComponent,
    AllowonlynumbersDirective,
    MaintenanceListComponent,
    ConsolidatedMaintenanceComponent
  ],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularTreeTableModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
     provide: HTTP_INTERCEPTORS,
      useClass: Token,
      multi: true
     },AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// {
//   provide: HTTP_INTERCEPTORS,
//   useClass: Token,
//   multi: true
// }
