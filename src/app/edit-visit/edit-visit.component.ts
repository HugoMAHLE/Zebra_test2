import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

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
  selector: 'app-edit-visit',
  standalone: true,
  imports: [MatDivider,  
  FormsModule, 
  ReactiveFormsModule, 
  NgIf,
  MatTableModule],
  templateUrl: './edit-visit.component.html',
  styleUrl: './edit-visit.component.css'
})
export class EditVisitComponent {

  router = inject(Router);

  readonly dialog = inject(MatDialog);

  openDialog(){
    this.dialog.open(EditDialogComponent)
  }

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
  
    displayedColumns : string[] = ['CName','email', 'Action']
    dataSource = new MatTableDataSource<TableCompany>(ELEMENT_DATA);
    selection = new SelectionModel<TableCompany>(true, []);
    
    ColumnsToDisplay : string[] = ['Name','LName','Email','Phone']

  navAdd(){
    this.router.navigate(["/menu/addvisitor"])
  }

  navCreate(){
    this.router.navigate(["/menu/createvisitor"])
  }
}
