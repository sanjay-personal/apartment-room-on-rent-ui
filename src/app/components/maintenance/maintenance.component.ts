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
  MaintenanceAmount: any;


  ngOnInit() {

    this.userDetails  = this.authService.getLoggedUserDetails()
    this.ApartmentName = this.userDetails['ApartmentName']
    this.ApartmentId = this.userDetails['ApartmentId']
    this.MaintenanceAmount = this.userDetails['MaintenanceAmount']
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
    this.model['ApartmentName'] = this.ApartmentName
    this.model['ApartmentId'] = this.ApartmentId
    this.model['FlatId'] = this.model.FlatNumber[0]['FlatId']
    this.model['FlatNumber'] = this.model.FlatNumber[0]['FlatNumber']
    this.model['MaintenanceAmount'] = this.MaintenanceAmount


    this.http.post('http://localhost:8080/api/maintenance', this.model).subscribe(resp => {
      console.log("resppppp", resp)
      if(resp['status']['code'] === 'SUCCESS') {
      form.resetForm()
      alert(resp['status']['message'])
      } else {
        this.model.FlatNumber = [this.flatNumber.find(x=>x.FlatId === this.model['FlatId'])]
        alert(resp['status']['message'])
      }
    })
  }

}
