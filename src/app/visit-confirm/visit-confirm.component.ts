import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-visit-confirm',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './visit-confirm.component.html',
  styleUrl: './visit-confirm.component.css'
})
export class VisitConfirmComponent implements OnInit {
  
  ngOnInit(): void {
    
  }
}
