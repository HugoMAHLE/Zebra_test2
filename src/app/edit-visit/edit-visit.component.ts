import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { MatDivider } from '@angular/material/divider';
import { AgGridAngular } from 'ag-grid-angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-visit',
  standalone: true,
  imports: [MatDivider, 
  AgGridAngular, 
  FormsModule, 
  ReactiveFormsModule, 
  NgIf],
  templateUrl: './edit-visit.component.html',
  styleUrl: './edit-visit.component.css'
})
export class EditVisitComponent {
  LVisitForm = new FormGroup({
    Date : new FormControl('', Validators.required),
    Checkin : new FormControl('', Validators.required)
  });

  get DateControl(): FormControl{
    return this.LVisitForm.get('Date') as FormControl
  }

  get CheckinControl(): FormControl{
    return this.LVisitForm.get('Checkin') as FormControl
  }

  colDefs: ColDef[] = [
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
}
