import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

declare var require: any;
declare var  isLoginView: boolean;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoginView = true;

  userObj: any = {
    userID: '',
    email: '',
    pass: ''
  }

  router = inject(Router);

  onLogin() {
    const isLocalData = localStorage.getItem("angular18Local")

    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find((m: any) => m.userID == this.userObj.userID && m.pass == this.userObj.pass)

      if (isUserFound != undefined){
        this.router.navigateByUrl('menu')
      } else {
        alert("Numero de reloj o contraseña erroneas")
      }
    } else {
      alert("No se encontro el usuario")
    }
  }

  onRegister() {
    const isLocalData = localStorage.getItem("angular18Local")

    if (isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userObj);
      localStorage.setItem("angular18Local", JSON.stringify(localArray))

    } else {
      const localArray = [];

      localArray.push(this.userObj);
      localStorage.setItem("angular18Local", JSON.stringify(localArray))
    }
    alert("Registration Success")
  }

}
