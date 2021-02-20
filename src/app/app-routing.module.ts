import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentComponent } from './components/apartment/apartment.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { MaintenanceListComponent } from './components/maintenance/maintenance-list/maintenance-list.component';
import { ConsolidatedMaintenanceComponent } from './components/maintenance/consolidated-maintenance/consolidated-maintenance.component';


const routes: Routes = [{
  path: "", component: ApartmentListComponent
},
{
  path: "form", component: ApartmentComponent,
  children: [{
    path: ':id',
    component: ApartmentComponent
  }
  ]

}, {
  path: "login", component: LoginComponent
}, {
  path: "signup", component: SignupComponent
}, {
  path: "maintenance", component: MaintenanceComponent
}, {
  path: "maintenance-list", component: MaintenanceListComponent
}, {
  path: "consolidated-maintenance-list", component: ConsolidatedMaintenanceComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
