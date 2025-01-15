import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular, AgGridModule } from "ag-grid-angular";
import type { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [AgGridAngular, AgGridModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  router = inject(Router);

  rowData = [
    { Name: "Tesla", Email: "tellezmagallanes@gmail.com"},
    { Name: "Ford", Email: "tellezmagallanes@gmail.com" },
    { Name: "Toyota", Email: "tellezmagallanes@gmail.com" },
  ];

  colDefs: ColDef[] = [
    { field: "Name" , headerName: 'Name'
    },
    { field: "Email" , headerName: 'E-mail'}
  ];

  defaultColDef = {
    flex: 1,
    minWidth:100
  }

  navCreateVisit(){
    this.router.navigate(["/menu/createvisit"]);
  }
}
