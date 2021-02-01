import { Component, OnInit } from '@angular/core';
import { Apartments } from './classes/apartments';
import { Member } from './classes/members';
import { NgForm } from '@angular/forms';
import { Vehicel } from './classes/vehicel';
import { HttpClient } from '@angular/common/http';
// import { Member } from './classes/members';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  StayingArray = [];
  StayingSettings = {};



  TypeOfFlatArray = [];
  TypeOfFlatSettings = {};

  VehicleArray = [];
  VehicleSettings = {};
  particular: string;
  ParticularArray = [];
  ParticularSettings = {};
  blockToggle: boolean = false
  floorToggle: boolean = false


  model: Apartments = new Apartments();
  fieldArray = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.onStaying();
    this.onParticular();
    this.onTypeOfFlat();
    // this.model.Members.push(new Member())

  }



  onStaying() {

    this.StayingArray = [
      { item_id: 'Tenant', item_text: 'Tenant' },
      { item_id: 'Owner', item_text: 'Owner' }
    ]
    this.StayingSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onStayingSelect(item) {
    // this.model.Staying = item['item_id']
  }
  onStayingDeSelect(item) {
    this.model.Staying = ''

  }



  onTypeOfFlat() {

    this.TypeOfFlatArray = [
      { item_id: '1BHK', item_text: '1BHK' },
      { item_id: '2BHK', item_text: '2BHK' },
      { item_id: '3BHK', item_text: '3BHK' }
    ]
    this.TypeOfFlatSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onTypeOfFlatSelect(item) {
    // this.model.TypeOfFlat = item['item_id']
  }
  onTypeOfFlatDeSelect(item) {
    // this.model.TypeOfFlat = ''

  }

  onParticular() {

    this.ParticularArray = [
      { item_id: 'Block', item_text: 'Block' },
      { item_id: 'Floor', item_text: 'Floor' }
    ]
    this.ParticularSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onParticularSelect(item) {
    if (item['item_id'] === 'Block') {
      this.blockToggle = true
      this.floorToggle = true
    } else {
      this.blockToggle = false
      this.floorToggle = true

    }


  }

  onParticularDeSelect(item) {
    this.blockToggle = false;
    this.floorToggle = false
  }

  onMembersChange(e) {
    this.model.Members = []
    for (var i = 0; i < parseInt(e); i++) {
      this.model.Members.push(new Member())
    }
  }

  onTypeOfVehicle() {

    this.VehicleArray = [
      { item_id: '2', item_text: '2' },
      { item_id: '4', item_text: '4' }
    ]
    this.VehicleSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }

  onVehiclesChange(e) {
    this.model.Vechiels = []
    for (var i = 0; i < parseInt(e); i++) {
      this.model.Vechiels.push(new Vehicel())
    }
    this.onTypeOfVehicle()
  }



  onVehicleSelect(item, i) {
    this.model.Vechiels[i].TypeOfVehicle = item['item_id']
  }
  onVehicleDeSelect(item, i) {
    this.model.Vechiels[i].TypeOfVehicle = ''

  }

  onFlatNumberChange(e) {
    this.model.ParkingNumber = e
  }

  submit(form: NgForm) {
    console.log("formmmmmmm", this.model)
    // this.http.post(this.productsUrl, product)
    this.model['Staying'] = this.model['Staying'][0]['item_id'] 
    this.model['TypeOfFlat'] = this.model['TypeOfFlat'][0]['item_id'] 

    this.http.post('http://localhost:8080/api/apartments', this.model).subscribe(resp => {
      console.log("resppppp", resp)
    })
  }

}
