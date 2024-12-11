import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirm-caseta',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './confirm-caseta.component.html',
  styleUrl: './confirm-caseta.component.css'
})
export class ConfirmCasetaComponent {

}
