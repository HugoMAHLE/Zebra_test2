import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './print.component.html',
  styleUrl: './print.component.css'
})
export class PrintComponent {
  router = inject(Router);

  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("angular18Local");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }

  navReception(){
    this.router.navigate(["/reception"]);
  }
}
