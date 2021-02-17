import { Component, OnInit } from '@angular/core';
import { TreeTableData, TreeTableHeaderObject, TreeTableRow, TreeTableRowAction, TtDataType } from 'angular-tree-table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {

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
    // this.populateHeaders();
    this.populateDummyData()
  }

  populateDummyData() {
    const data = [];
    this.http.get('http://localhost:8080/api/maintenance').subscribe(resp => {
      console.log("resppppp", resp)
      for (let i = 0; i < resp['primary'].length; i++) {
        const row = new TreeTableRow(i + '',resp['primary'][i] , false, null);
        data.push(row);
      }
    })
    this.tableData = new TreeTableData(this.tableConfig);
    this.populateHeaders();
    this.tableData.data = data;
  }
  populateHeaders() {
    this.tableHeaders.splice(0, this.tableHeaders.length);
    this.tableHeaders.push(new TreeTableHeaderObject('Flat Number', 'FlatNumber', null, true));
    this.tableHeaders.push(new TreeTableHeaderObject('Maintenance Date', '$VD:MaintenanceDate', null, true));
    this.tableHeaders.push(new TreeTableHeaderObject('Maintenance Amount', 'MaintenanceAmount', null, true));
    this.tableHeaders.push(new TreeTableHeaderObject('Month', 'Month', null, true));
    this.tableHeaders.push(new TreeTableHeaderObject('Year', 'Year', null, true));
    this.tableData.headers = this.tableHeaders;
  }


}
