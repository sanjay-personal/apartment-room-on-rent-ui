import { Component, OnInit } from '@angular/core';
import { TreeTableData, TreeTableDataConfig, TreeTableHeaderObject, TreeTableRow, TtDataType, TreeTableRowAction } from 'angular-tree-table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent implements OnInit {

  tableConfig = {
    context: this,
    rowClickablesContext: this,
    rowClickables: {},
    columnFilters: {},
    columnVisibilityDropDown: true,
    showPageLengthDropdown: true,
    showExpandAllArrows: true,
    commonSearch: false,
    excelExportButton: true,
    visibleColumnFiltersVisibility: true,
    canChangeVisbilityOnRuntime: false,
    fullClassName: 'table table-sm table-stripped',
  };
  tableData: TreeTableData = new TreeTableData(); 
  tableHeaders: TreeTableHeaderObject[] = []; 
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {

    this.populateDummyData()
  }

  populateDummyData() {
    const data = [];
    this.http.get('http://localhost:8080/api/apartments').subscribe(resp => {
      console.log("resppppp", resp)
      for (let i = 0; i < resp['primary'].length; i++) {
        const row = new TreeTableRow(i + '',resp['primary'][i] , false, null);
        if(resp['primary'][i]['Active'] === "1") {
        let edit = new TreeTableRowAction('Active', 'Active', 'btn btn-secondary btn-sm successWidth', this.ActiveOrInActive);
        edit.context = this;
        row.actions.push(edit);
        } else {
          let edit = new TreeTableRowAction('InActive', 'InActive', 'btn btn-brown btn-sm', this.ActiveOrInActive);
          edit.context = this;
          row.actions.push(edit);
        }
        row.clickablesContext = this;
        row.clickables = {
          ApartmentName: this.ApartmentNameClicks,
        };
        data.push(row);
      }
    })

    this.tableData = new TreeTableData(this.tableConfig);
    this.populateHeaders();
    this.tableData.data = data;
  }
  populateHeaders() {
    this.tableHeaders.splice(0, this.tableHeaders.length);
    this.tableHeaders.push(new TreeTableHeaderObject('Apartment Name', 'ApartmentName', null, true));
    this.tableHeaders.push(new TreeTableHeaderObject('Staying', 'Staying', null, true));
    this.tableHeaders.push(new TreeTableHeaderObject('Joining Date', 'JoiningDate', null, true));
    // this.tableHeaders.push(new TreeTableHeaderObject('Apartment Id', 'ApartmentId', null, true));
    this.tableHeaders.push(new TreeTableHeaderObject('Number Of Vehicles', 'NumberOfVehicles', null, true));
    // this.tableHeaders.push(new TreeTableHeaderObject('Active', '=CONCAT(<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>)', 'null', true));
    // this.tableHeaders.push(new TreeTableHeaderObject('Active', '=CONCAT(<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>)', 'null', true));

    // const actions = new TreeTableHeaderObject('Actions', '', null, true);
    // actions.dataType = TtDataType.ACTIONS;
    // this.tableHeaders.push(actions);

    let actions = new TreeTableHeaderObject('Active', '', '', true);
    actions.dataType = TtDataType.ACTIONS;
    this.tableHeaders.push(actions);
    this.tableData.headers = this.tableHeaders;
  }


  ApartmentNameClicks(data: any) {
    console.log("data",data)
    this.router.navigate(['/form/' + data['FlatId']],{queryParams:{id: data['FlatId']}});
  }

  ActiveOrInActive(data) {
    console.log("ActiveOrInActive",data)

  }

}
