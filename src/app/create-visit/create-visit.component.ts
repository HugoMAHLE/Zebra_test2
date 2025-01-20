import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, StoreRefreshAfterParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDivider } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface TableCompany{
  CName: string
  email: string
}

const ELEMENT_DATA: TableCompany[] = [
  {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'},
  {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'},
  {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'}

]

export interface TableVisitors{
  Name: string
  LName: string
  Email: string
  Phone: string
}

@Component({
  selector: 'app-create-visit',
  standalone: true,
  imports: [MatDivider, NgIf, MatTableModule],
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

  constructor(private router: Router) { }

  addVisitor(){
    this.router.navigate(["/menu/addvisitor"]);
  };

  createVisitor(){
    this.router.navigate(["/menu/createvisitor"]);
  };

  displayedColumns : string[] = ['CName','email', 'Action']
  dataSource = new MatTableDataSource<TableCompany>(ELEMENT_DATA);
  selection = new SelectionModel<TableCompany>(true, []);
  
  ColumnsToDisplay : string[] = ['Name','LName','Email','Phone']
}
