import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-video-visit',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './video-visit.component.html',
  styleUrl: './video-visit.component.css'
})
export class VideoVisitComponent {

}
