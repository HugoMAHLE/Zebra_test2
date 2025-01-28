import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router } from 'express';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-confirm-caseta',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './confirm-caseta.component.html',
  styleUrl: './confirm-caseta.component.css'
})
export class ConfirmCasetaComponent {
  router = inject(Router);

  navPrint(){
    this.router.navigate(["/reception/print"]);
  }

  navEdit(){
    this.router.navigate(["/reception/edit-reception"])
  }

  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("angular18Local");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }
}
