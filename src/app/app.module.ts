import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { AngularTreeTableModule } from 'angular-tree-table';


@NgModule({
  declarations: [
    AppComponent,
    ApartmentListComponent
  ],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularTreeTableModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
