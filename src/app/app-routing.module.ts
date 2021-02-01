import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';


const routes: Routes = [{
  path:"list",component: ApartmentListComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
