import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { merge } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recep-edit',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatToolbarModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recep-edit.component.html',
  styleUrl: './recep-edit.component.css'
})
export class RecepEditComponent {

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  
  router = inject(Router);
  
  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }


  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  navInvitados(){
    this.router.navigate(["/security/confirm"])
  }

  logOff() {
    console.log("sesion terminada");
    localStorage.removeItem("angular18Local");
    alert("Sesión cerrada");
    this.router.navigate(['/login']);
  }
}
