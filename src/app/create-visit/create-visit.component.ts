// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDivider } from '@angular/material/divider';
// import { NgIf } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-create-visit',
//   standalone: true,
//   imports: [MatDivider, NgIf],
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

//   defaultColDef = {
//     flex: 1,
//     minWdith:100
//   }

//   constructor(private router: Router) { }

//   addVisitor(){
//     this.router.navigate(["/menu/addvisitor"]);
//   };

//   createVisitor(){
//     this.router.navigate(["/menu/createvisitor"]);
//   };

// }



import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatSelectModule, MatSelect, MatOption } from '@angular/material/select';


import { MatTableModule, MatTable, MatCell, MatHeaderCell, MatHeaderRow, MatRow } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import axios from 'axios';

interface Company {
  company: string;
  isSelected?: boolean; // Optional property for checkbox selection
}

@Component({
  selector: 'app-create-visit',
  standalone: true,
  imports: [
    MatDivider,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatCell,
    MatHeaderCell,
    MatTable,
    MatFormField,
    MatError,
    MatSelect,
    MatIcon,
    MatOption,
    NgForOf,
    NgIf],
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.css']
})

export class CreateVisitComponent {
  apiURL = environment.api_URL;
  dataSource: MatTableDataSource<Company> = new MatTableDataSource<Company>([]);
  companies = [];

  // Form group
  CVisitForm = new FormGroup({
    reason: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    ent: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  // Default column definition (if grid functionality is still needed)
  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };

  ngOnInit(): void {
    this.getCompanies();
    let companies = axios.get(this.apiURL + 'visitor/getcompanies')
  }


  // Getters for form controls
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

  // Constructor
  constructor(private router: Router, private dialog: MatDialog) {}

  // Navigate to add visitor
  addVisitor() {
    this.router.navigate(['/menu/addvisitor']);
  }

  // Navigate to create visitor
  createVisitor() {
    this.router.navigate(['/menu/createvisitor']);
  }

  //Axios API Requests
  getCompanies() {
    axios.get(this.apiURL + 'visitor/getcompanies')
      .then((response) => {
        this.companies = response.data; // Assign the data when the Promise resolves
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }

  AddCompanyg(){

  }
}
