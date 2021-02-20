import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TreeTableData, TreeTableHeaderObject, TreeTableRow, TreeTableRowAction, TtDataType } from 'angular-tree-table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LoginService } from 'src/app/service/login.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit,AfterViewInit {
  sumMonthWiseList = 0
  totalActiveFlats: any
  totalActiveFlatsMaintenanceAmount: any
  BalanceFlatsMaintenanceAmount: any


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
  userDetails: any;
  MaintenanceAmount: any;
  currencyOptional = {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
  resultTotalActiveFlatsMaintenanceAmount
  resultBalanceFlatsMaintenanceAmount
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService, private authService: AuthService) { }

  ngOnInit() {
    this.userDetails  = this.authService.getLoggedUserDetails()
    this.MaintenanceAmount = this.userDetails['MaintenanceAmount']

    this.populateDummyData()
  }

  totalFlats() {
    this.loginService.getFlatNumbers().subscribe(res=>{
      const flats = res['primary']
      this.totalActiveFlats = flats.length
      this.totalActiveFlatsMaintenanceAmount = parseFloat(this.totalActiveFlats) * parseFloat(this.MaintenanceAmount)
       this.resultTotalActiveFlatsMaintenanceAmount = new Number(this.totalActiveFlatsMaintenanceAmount).toLocaleString("en-IN", this.currencyOptional);

      this.BalanceFlatsMaintenanceAmount = parseFloat(this.totalActiveFlatsMaintenanceAmount) - (this.sumMonthWiseList)
      this.resultBalanceFlatsMaintenanceAmount = new Number(this.BalanceFlatsMaintenanceAmount).toLocaleString("en-IN", this.currencyOptional);
      console.log("BalanceFlatsMaintenanceAmount",this.resultBalanceFlatsMaintenanceAmount,this.BalanceFlatsMaintenanceAmount,this.totalActiveFlatsMaintenanceAmount,this.sumMonthWiseList)
    })
  }
  
  sumTag() {
   const result = new Number(this.sumMonthWiseList).toLocaleString("en-IN", this.currencyOptional);
    var myHtmlContent = "<td class=font-weight-bold>Total Amount Collected</td><td></td><td class=font-weight-bold>"+result+"</td><td></td><td></td>"
    var tableRef = document.getElementById('tableh').getElementsByTagName('thead')[0];
    var newRow = tableRef.insertRow(0);
    newRow.setAttribute("id","sum")
    newRow.innerHTML = myHtmlContent;
  }

  ngAfterViewInit() {
    this.sumTag()
    this.totalFlats()
  }

  populateDummyData() {
    const data = [];
    this.http.get('http://localhost:8080/api/maintenance/'+moment(new Date()).format('MMMM')).subscribe(resp => {
      console.log("resppppp", resp)
      this.sumMonthWiseList = 0
      for (let i = 0; i < resp['primary'].length; i++) {
        const row = new TreeTableRow(i + '',resp['primary'][i] , false, null);
        this.sumMonthWiseList = this.sumMonthWiseList + parseFloat(resp['primary'][i]['MaintenanceAmount'])

        data.push(row);
        
      }
    })
    this.tableData = new TreeTableData(this.tableConfig);
    this.populateHeaders();
    this.tableData.data = data;
    // this.ngAfterViewInit()
    this.sumTag()
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
