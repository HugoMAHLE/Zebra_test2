import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDivider } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-visit',
  standalone: true,
  imports: [AgGridAngular, MatDivider, NgIf],
  templateUrl: './create-visit.component.html',
  styleUrl: './create-visit.component.css'
})
export class CreateVisitComponent {
  CVisitForm = new FormGroup({
    reason : new FormControl('', Validators.required),
    date : new FormControl ('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    ent : new FormControl ('', Validators.required),
    name : new FormControl ('', Validators.required),
  });

  get nameControl(): FormControl{
    return this.CVisitForm.get('name') as FormControl
  }

  get reasonControl(): FormControl{
    return this.CVisitForm.get('reason') as FormControl
  }

  get emailControl(): FormControl{
    return this.CVisitForm.get('email') as FormControl
  }

  get dateControl(): FormControl{
    return this.CVisitForm.get('date') as FormControl
  }

  get entControl(): FormControl{
    return this.CVisitForm.get('ent') as FormControl
  }

  rowData = [
    { Name: "Tesla", Email: "tellezmagallanes@gmail.com"},
    { Name: "Ford", Email: "tellezmagallanes@gmail.com" },
    { Name: "Toyota", Email: "tellezmagallanes@gmail.com" },
  ];

  colDefs: ColDef[] = [
    { field: "name" , headerName: 'Name'},
    { field: "email" , headerName: 'E-mail'},
  ];

  colDef: ColDef[] = [
    { field: "Name" , headerName: 'Name'},
    { field: "LName" , headerName: 'Last Name'},
    { field: "Email" , headerName: 'E-mail'},
    { field: "Curp" , headerName: 'CURP'},
    { field: "Tel" , headerName: 'Cellphone Number'}
  ];

  defaultColDef = {
    flex: 1,
    minWdith:100
  }

  constructor(private router: Router) { }

  addVisitor(){
    this.router.navigate(["/menu/addvisitor"]);
  };

  createVisitor(){
    this.router.navigate(["/menu/createvisitor"]);
  };

}
