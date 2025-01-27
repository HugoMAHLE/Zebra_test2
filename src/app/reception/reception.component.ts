import { Component,inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent {
router = inject(Router);

logOff() {
  console.log("sesion terminada");
  localStorage.removeItem("angular18Local");
  alert("Sesión cerrada");
  this.router.navigate(['/login']);
}

navConfirmCaseta(){
  this.router.navigate(["/security/confirm"]);
}

}
