// import { Component } from '@angular/core';
// import { ColDef } from 'ag-grid-community';
// import { AgGridAngular } from 'ag-grid-angular';

// @Component({
//   selector: 'app-add-visitor',
//   standalone: true,
//   imports: [AgGridAngular],
//   templateUrl: './add-visitor.component.html',
//   styleUrl: './add-visitor.component.css'
// })
// export class AddVisitorComponent {

//   rowData = [
//     { Name: "Daniel", LName: "Tellez", Email: "tellezmagallanes@gmail.com", Curp: "TEMD031218HCHLGNA0", Tel: "656-107-4675"},
//     { Name: "Hugo", LName: "Meza", Email: "hugomeza@gmail.com", Curp: "HDUCBNKDBCCDC051DCD", Tel: "656-123-2468"},
//     { Name: "Diego", LName: "Originales", Email: "diegooriginales@gmail.com", Curp: "TEVJDCIDBCDHCBQ", Tel: "656-246-1379"}
//   ];

//   colDefs: ColDef[] = [
//     { field: "Name" , headerName: 'Name', checkboxSelection: true},
//     { field: "LName" , headerName: 'Last Name'},
//     { field: "Email" , headerName: 'E-mail'},
//     { field: "Curp" , headerName: 'CURP'},
//     { field: "Tel" , headerName: 'Cellphone Number'}
//   ];

//   defaultColDef = {
//     flex: 1,
//     minWdith:100
//   }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { environment } from '../../environments/environment.development';

interface Visitor {
  Name: string;
  LName: string;
  Email: string;
  Phone: string;
  isSelected?: boolean; // Optional property for checkbox selection
}

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent implements OnInit {
  displayedColumns: string[] = ['select', 'Name', 'LName', 'Email', 'Phone', 'actions'];
  dataSource: MatTableDataSource<Visitor> = new MatTableDataSource<Visitor>([]);
  totalLength = 0;
  apiURL = environment.api_URL;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.fetchVisitors();
  }

  async fetchVisitors() {
    try {
      const response = await axios.get(this.apiURL + "visitor/all");
      if (response.data.ok) {
        const visitors = response.data.msg; // Assuming 'msg' contains the array of visitors
        this.dataSource.data = visitors;
        this.totalLength = visitors.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        console.error('Error fetching visitors:', response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  }

  onEdit(row: any) {
    console.log('Edit visitor:', row);
  }

  selectAllRows() {
    this.dataSource.data.forEach((row) => (row.isSelected = true));
  }

  isAllSelected() {
    return this.dataSource.data.every((row) => row.isSelected);
  }

  onSelectionChange(row: Visitor, event: MatCheckboxChange): void {
    row.isSelected = event.checked;
    console.log(`${row.Name} selected: ${row.isSelected}`);
  }
}
