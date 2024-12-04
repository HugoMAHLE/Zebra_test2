import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  rowData = [
    { Name: "Tesla", Email: "tellezmagallanes@gmail.com"},
    { Name: "Ford", Email: "tellezmagallanes@gmail.com" },
    { Name: "Toyota", Email: "tellezmagallanes@gmail.com" },
  ];

  colDefs: ColDef[] = [
    { field: "Name" , headerName: 'Name' , checkboxSelection: true
    },
    { field: "Email" , headerName: 'E-mail'}
  ];

  defaultColDef = {
    flex: 1,
    minWdith:100
  }
}
