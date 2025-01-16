import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from "ag-grid-angular";
import { ColDef } from "ag-grid-community";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  router = inject(Router);

<<<<<<< Updated upstream
  rowData = [
    { Name: "Tesla", Email: "tellezmagallanes@gmail.com", Code: "1234567890"},
    { Name: "Ford", Email: "tellezmagallanes@gmail.com", Code: "1234567890"},
    { Name: "Toyota", Email: "tellezmagallanes@gmail.com", Code: "1234567890"},
=======
  rowData = [ //await axios.get(this.apiURL + "host/visits", {  });
    { Name: "Tesla", Email: "tellezmagallanes@gmail.com"},
    { Name: "Ford", Email: "tellezmagallanes@gmail.com" },
    { Name: "Toyota", Email: "tellezmagallanes@gmail.com" },
>>>>>>> Stashed changes
  ];

  colDefs: ColDef[] = [
    { field: "Name" , headerName: 'Name'},
    { field: "Email" , headerName: 'Company E-mail'},
    { field: "Code" , headerName: 'Visit code'}
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  };

  navCreateVisit(){
    this.router.navigate(["/menu/createvisit"]);
  }
}
