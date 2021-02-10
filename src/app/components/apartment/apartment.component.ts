import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apartments } from 'src/app/classes/apartments';
import { HttpClient } from '@angular/common/http';
import { Member } from 'src/app/classes/members';
import { Vehicel } from 'src/app/classes/vehicel';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';




@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})
export class ApartmentComponent implements OnInit {
  StayingArray = [];
  StayingSettings = {};



  TypeOfFlatArray = [];
  TypeOfFlatSettings = {};

  VehicleArray = [];
  VehicleSettings = {};
  particular: any;
  ParticularArray = [];
  ParticularSettings = {};
  blockToggle: boolean = false
  floorToggle: boolean = false


  model: Apartments = new Apartments();
  fieldArray = []
  editingId: any;
  editResp = {}

  constructor(private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit() {
    this.editingId = this.route.snapshot.queryParams['id'];

    console.log("routeee",this.route.snapshot)
    console.log("this.editingId",this.editingId)
    this.onStaying();
    this.onParticular();
    this.onTypeOfFlat();
    if(this.editingId !== undefined) {
      this.loadEdit()
    }
  }

  loadEdit() {
    let editParticular

    this.http.get('http://localhost:8080/api/apartments/'+this.editingId).subscribe(resp => {
      console.log("resppppp", resp)
      this.editResp = resp['primary']
      this.model.ApartmentName = this.editResp['ApartmentName'];
      this.model.Staying = [this.StayingArray.find(x=>x.item_id === this.editResp['Staying'])];
      editParticular = this.editResp['BlockNumber'];

      if(editParticular !== undefined) {
      this.particular = [{ item_id: 'Block', item_text: 'Block' }]

      } else {
      
      this.particular = [{ item_id: 'Floor', item_text: 'Floor' }]
      }

      this.onParticularSelect(this.particular[0]);

      this.model.JoiningDate = moment(new Date(this.editResp['JoiningDate'])).format('YYYY-MM-DD');
      this.model.BlockNumber = this.editResp['BlockNumber'];
      this.model.FlatNumber = this.editResp['FlatNumber'];
      this.model.FloorNumber = this.editResp['FloorNumber'];
      this.model.TypeOfFlat = [this.TypeOfFlatArray.find(x=>x.item_id === this.editResp['TypeOfFlat'])]
      this.model.NumberOfMembers = this.editResp['NumberOfMembers']
      this.model.Members = this.editResp['Members']
      this.model.ApartmentId = this.editResp['ApartmentId']
      this.model.NumberOfVehicles =  this.editResp['NumberOfVehicles']
      this.model.Vechiels = this.editResp['Vechiels']
      this.model.ParkingNumber = this.editResp['ParkingNumber']

      // for(var i=0; i<this.editResp['Vechiels'].length; i++) {
      //   // this.model.Vechiels.push()
      // }



    })
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
