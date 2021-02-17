import { Component, OnInit } from '@angular/core';
import { Maintenance } from 'src/app/classes/maintenance';
import { LoginService } from 'src/app/service/login.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {


  constructor(private loginService: LoginService, private authService: AuthService, private http: HttpClient ) { }

  model: Maintenance = new Maintenance();

  flatNumber = []
  flatNumberSetting = {}
  userDetails = {}
  ApartmentName: any;
  ApartmentId: any;


  ngOnInit() {

    this.userDetails  = this.authService.getLoggedUserDetails()
    this.ApartmentName = this.userDetails['ApartmentName']
    this.ApartmentId = this.userDetails['ApartmentId']
    this.loadFlatNumbers()
  }


  loadFlatNumbers() {

    this.flatNumberSetting = {
      singleSelection: true,
      idField: 'FlatId',
      textField: 'FlatNumber',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.loginService.getFlatNumbers().subscribe(res=>{
      this.flatNumber = res['primary']
      console.log("flatNumber",this.flatNumber)
    })
  }


  onFlatNumberSelect(item) {
    // this.login.ApartmentName = item['ApartmentId']
  }


  submit(form: NgForm,e) {
    e.preventDefault();
    console.log("formmmmmmm", this.model)
    if(form.invalid) {
      return
    }
    // this.http.post('http://localhost:8080/api/apartments', this.model).subscribe(resp => {
    //   console.log("resppppp", resp)
    //   if(resp['status']['code'] === 'SUCCESS') {
    //   form.resetForm()
    //   alert(resp['status']['message'])
    //   } else {
    //     this.model.TypeOfFlat = [this.TypeOfFlatArray.find(x=>x.item_id === this.model['TypeOfFlat'])]
    //     this.model.Staying = [this.StayingArray.find(x=>x.item_id === this.model['Staying'])];
    //     alert(resp['status']['message'])
    //   }
    // })
  }

}
