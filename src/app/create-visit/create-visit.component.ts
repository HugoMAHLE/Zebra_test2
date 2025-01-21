// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ColDef, StoreRefreshAfterParams } from 'ag-grid-community';
// import { AgGridAngular } from 'ag-grid-angular';
// import { MatDivider } from '@angular/material/divider';
// import { NgIf } from '@angular/common';
// import { Router } from '@angular/router';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { SelectionModel } from '@angular/cdk/collections';

// export interface TableCompany{
//   CName: string
//   email: string
// }

// const ELEMENT_DATA: TableCompany[] = [
//   {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'},
//   {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'},
//   {CName: 'Daniel', email: 'daniel.a.tellez@mahle.com'}

// ]

// export interface TableVisitors{
//   Name: string
//   LName: string
//   Email: string
//   Phone: string
// }

// @Component({
//   selector: 'app-create-visit',
//   standalone: true,
//   imports: [MatDivider, NgIf, MatTableModule],
//   templateUrl: './create-visit.component.html',
//   styleUrl: './create-visit.component.css'
// })
// export class CreateVisitComponent {
//   CVisitForm = new FormGroup({
//     reason : new FormControl('', Validators.required),
//     date : new FormControl ('', Validators.required),
//     email : new FormControl('', [Validators.required, Validators.email]),
//     ent : new FormControl ('', Validators.required),
//     name : new FormControl ('', Validators.required),
//   });

//   get nameControl(): FormControl{
//     return this.CVisitForm.get('name') as FormControl
//   }

//   get reasonControl(): FormControl{
//     return this.CVisitForm.get('reason') as FormControl
//   }

//   get emailControl(): FormControl{
//     return this.CVisitForm.get('email') as FormControl
//   }

//   get dateControl(): FormControl{
//     return this.CVisitForm.get('date') as FormControl
//   }

//   get entControl(): FormControl{
//     return this.CVisitForm.get('ent') as FormControl
//   }

//   constructor(private router: Router) { }

//   addVisitor(){
//     this.router.navigate(["/menu/addvisitor"]);
//   };

//   createVisitor(){
//     this.router.navigate(["/menu/createvisitor"]);
//   };

//   displayedColumns : string[] = ['CName','email', 'Action']
//   dataSource = new MatTableDataSource<TableCompany>(ELEMENT_DATA);
//   selection = new SelectionModel<TableCompany>(true, []);

//   ColumnsToDisplay : string[] = ['Name','LName','Email','Phone']
// }

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';
import { SelectionModel } from '@angular/cdk/collections';
import { NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { AddCompanyComponent } from './dialog/addCompany.component';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import {  MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Visitor } from '../add-visitor/visitor.model';

export interface TableCompany {
  CName: string;
  email: string;
}

const ELEMENT_DATA: TableCompany[] = [
  { CName: 'Daniel', email: 'daniel.a.tellez@mahle.com' },
  { CName: 'John', email: 'john.doe@example.com' },
  { CName: 'Jane', email: 'jane.doe@example.com' },
];

export interface TableVisitors {
  fname: string;
  lname: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-create-visit',
  standalone: true,
  imports: [
    MatDivider,
    NgIf, NgFor,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule
  ],
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.css'],
})
export class CreateVisitComponent {
  CVisitForm = new FormGroup({
    reason: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    ent: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  enterprises: string[] = [];
  selectedCompany: string = '';
  apiURL = environment.api_URL;
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchEnterprises();
  }


  async fetchEnterprises() {
    try {
      const response = await axios.get(this.apiURL + "visitor/getcompanies");
      if (response.data.ok) {
        this.enterprises = response.data.msg; // Assuming 'msg' contains the array of visitors
      } else {
        console.error('Error fetching Enterprises:', response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching Enterprises:', error);
    }
  }



  get nameControl(): FormControl {
    return this.CVisitForm.get('name') as FormControl;
  }

  get reasonControl(): FormControl {
    return this.CVisitForm.get('reason') as FormControl;
  }

  get emailControl(): FormControl {
    return this.CVisitForm.get('email') as FormControl;
  }

  get dateControl(): FormControl {
    return this.CVisitForm.get('date') as FormControl;
  }

  get entControl(): FormControl {
    return this.CVisitForm.get('ent') as FormControl;
  }

  addVisitor() {
    this.router.navigate(['/menu/addvisitor']);
  }

  createVisitor() {
    this.router.navigate(['/menu/createvisitor']);
  }

  addVisitorsToTable(selectedVisitors: Visitor[]) {
    this.TableVisitors = [...this.TableVisitors, ...selectedVisitors]; // Add selected visitors to the visitors array
    console.log('Updated visitors in CreateVisitComponent:', this.TableVisitors);
  }

  onEnterpriseSelect(selectedEnterprise: string) {
    console.log('Selected enterprise:', selectedEnterprise);
  }

  async addEnterprise() {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(async (company) => {
      if (company) {
        try {
          const response = await axios.post(this.apiURL + 'visitor/addcompany', { company }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response)
          if (response.data.ok) {
            this.enterprises = response.data.msg;
            this.selectedCompany = company;
            window.location.reload();
          } else {
            console.error('Error adding company:', response.data.msg);
          }
        } catch (error) {
          console.error('Error adding company:', error);
        }
      } else {
        // Clear the selection if no company was added
        this.selectedCompany = ''; // Reset the selected value
        window.location.reload();
      }
    });
  }

  displayedColumns: string[] = ['fname', 'lname', 'email', 'phone'];
  dataSource = new MatTableDataSource<TableCompany>(ELEMENT_DATA);
  selection = new SelectionModel<TableCompany>(true, []);

  ColumnsToDisplay: string[] = ['fname', 'lname', 'email', 'phone'];
}
