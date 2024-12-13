import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-visitor',
  standalone: true,
  templateUrl: './visitor.component.html',
  styleUrl: './visitor.component.css',
  imports: [
    NgIf,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterLink
  ]
})
export class VisitorComponent {

  ClientForm = new FormGroup({
    name : new FormControl('', Validators.required),
    LName : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    Curp : new FormControl('', Validators.required),
    Tel : new FormControl ('', Validators.required)
  });

  get nameControl(): FormControl{
    return this.ClientForm.get('name') as FormControl
  }

  get LnameControl(): FormControl{
    return this.ClientForm.get('LName') as FormControl
  }

  get emailControl(): FormControl{
    return this.ClientForm.get('email') as FormControl
  }

  get CurpControl(): FormControl{
    return this.ClientForm.get('Curp') as FormControl
  }

  get TelControl(): FormControl{
    return this.ClientForm.get('Tel') as FormControl
  }
}
