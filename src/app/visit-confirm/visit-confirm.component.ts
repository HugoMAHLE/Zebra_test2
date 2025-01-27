import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from 'express';
import { VisitErrorComponent } from '../visit-error/visit-error.component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-visit-confirm',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatIconModule],
  templateUrl: './visit-confirm.component.html',
  styleUrl: './visit-confirm.component.css'
})
export class VisitConfirmComponent implements OnInit {

  router = inject(Router);

  readonly dialog = inject(MatDialog);

  Error(){
    this.dialog.open(VisitErrorComponent);
  }

  ngOnInit(): void {

  }

  navYes(){
    this.router.navigate(["/visitor/video"]);
  }

}
