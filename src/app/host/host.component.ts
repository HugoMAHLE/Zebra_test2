import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './host.component.html',
  styleUrl: './host.component.css'
})
export class HostComponent {
  router = inject(Router);

  rowData = [ //await axios.get(this.apiURL + "host/visits", {  });
    { Name: "Tesla", Email: "tellezmagallanes@gmail.com"},
    { Name: "Ford", Email: "tellezmagallanes@gmail.com" },
    { Name: "Toyota", Email: "tellezmagallanes@gmail.com" }
  ];

  displayedColumns: string[] = ['Name', 'Email'];

  navCreateVisit(){
    this.router.navigate(["/menu/createvisit"]);
  }
}
