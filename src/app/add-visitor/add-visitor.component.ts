import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrl: './add-visitor.component.css'
})
export class AddVisitorComponent {

  rowData = [
    { Name: "Daniel", LName: "Tellez", Email: "tellezmagallanes@gmail.com", Curp: "TEMD031218HCHLGNA0", Tel: "656-107-4675"},
    { Name: "Hugo", LName: "Meza", Email: "hugomeza@gmail.com", Curp: "HDUCBNKDBCCDC051DCD", Tel: "656-123-2468"},
    { Name: "Diego", LName: "Originales", Email: "diegooriginales@gmail.com", Curp: "TEVJDCIDBCDHCBQ", Tel: "656-246-1379"}
  ];

  colDefs: ColDef[] = [
    { field: "Name" , headerName: 'Name', checkboxSelection: true},  
    { field: "LName" , headerName: 'Last Name'},
    { field: "Email" , headerName: 'E-mail'},
    { field: "Curp" , headerName: 'CURP'},
    { field: "Tel" , headerName: 'Cellphone Number'}
  ];

  defaultColDef = {
    flex: 1,
    minWdith:100
  }
}
