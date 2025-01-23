import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NgIf } from '@angular/common';
import { Router } from 'express';

export interface TableCompany {
  CName: string
  email: string
}

const ELEMENT_DATA: TableCompany[] = [
  { CName: 'Daniel', email: 'daniel.a.tellez@mahle.com' },
  { CName: 'Daniel', email: 'daniel.a.tellez@mahle.com' },
  { CName: 'Daniel', email: 'daniel.a.tellez@mahle.com' }

]

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, FormsModule, ReactiveFormsModule, NgIf, MatTableModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css'
})
export class EditDialogComponent {

  router = inject(Router);

  LVisitForm = new FormGroup({
    Date: new FormControl('', Validators.required),
    Checkin: new FormControl('', Validators.required)
  });

  get DateControl(): FormControl {
    return this.LVisitForm.get('Date') as FormControl
  }

  get CheckinControl(): FormControl {
    return this.LVisitForm.get('Checkin') as FormControl
  }

  displayedColumns: string[] = ['CName', 'email', 'Action']
  dataSource = new MatTableDataSource<TableCompany>(ELEMENT_DATA);
  selection = new SelectionModel<TableCompany>(true, []);

  ColumnsToDisplay: string[] = ['Name', 'LName', 'Email', 'Phone']

  navAdd(){
    this.router.navigate(["/menu/addvisitor"])
  }

  navCreate(){
    this.router.navigate(["/menu/createvisitor"])
  }

}
