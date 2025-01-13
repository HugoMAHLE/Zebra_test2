import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import axios from "axios";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  isLoginView = true;
  show = false;
  hide = true;

  userObj: any = {
    userID: '',
    email: '',
    pass: ''
  };

  router = inject(Router);
  apiURL = environment.api_URL;
  errorMessage: any;

  async onLogin() {
    const userid: any = this.userObj.userID;
    const pass: any = this.userObj.pass;

    try {
      const { data } = await axios.post(this.apiURL + "users/login", { userid, pass });

      if (data && data.token && data.type) {
        console.log("Login exitoso:", data);

        // save token and user type en localStorage
        const storedData = localStorage.getItem("angular18Local");
        const localArray = storedData ? JSON.parse(storedData) : [];
        localArray.push({
          token: data.token,
          type: data.type,
        });
        localStorage.setItem("angular18Local", JSON.stringify(localArray));

        console.log(data.type)
        if (data.type === 1) {
          alert("Bienvenido, administrador");
          this.router.navigate(["/admin-dashboard"]);
        } else if (data.type === "user") {
          alert("Bienvenido, usuario general");
          this.router.navigate(["/menu/host"]);
        } else if (data.type === 3) {
          alert("Bienvenido, host");
          this.router.navigate(["/host-dashboard"]);
        }

        const token = localStorage.getItem("token");
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.type === "admin") {
            // admin
          } else if (payload.type === "user") {
            // user
          }
        }
      } else {
        alert("Error desconocido al iniciar sesión.");
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;

        if (status === 404 || status === 401) {
          alert("Usuario o contraseña incorrectos.");
          this.errorMessage = "Usuario o contraseña incorrectos."
        } else if (status === 500) {
          alert("Error en el servidor. Por favor, intenta más tarde.");
          this.errorMessage = "Error en el servidor. Por favor, intenta más tarde."
        } else {
          alert(`Error inesperado: ${status}`);
          this.errorMessage = `Error inesperado: ${status}`
        }
      } else if (error.request) {
        alert("No se recibió respuesta del servidor. Revisa tu conexión a internet.");
      } else {
        alert("Hubo un error al procesar la solicitud.");
      }
      console.error("Error en login:", error);
    }
  }

  async onRegister() {
    const userid: any = this.userObj.userID;
    const pass: any = this.userObj.pass;
    const email: any = this.userObj.email;

    try {
      const { data } = await axios.post(this.apiURL + "users/register", { userid, email, pass });
      console.log("Registro exitoso:", data);
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Hubo un problema con el registro");
    }
  }

  async showPopup() {
    this.show = !this.show;
    this.hide = !this.show;
  };

  // Token validation
  isTokenValid(): boolean {
    const storedData = localStorage.getItem("angular18Local");
    if (!storedData) return false;

    const localArray = JSON.parse(storedData);
    const tokenData = localArray[localArray.length - 1]; // Último token guardado
    if (!tokenData || !tokenData.expiration) return false;

    const currentTime = new Date().getTime();
    return currentTime < tokenData.expiration;
  }

  // delete token from localStorage (log off)
  logOff() {
    localStorage.removeItem("angular18Local");
    alert("Sesión cerrada");
  }
}


  //onLogin() {
  // const isLocalData = localStorage.getItem("angular18Local")
  // if (isLocalData != null) {
  //   const users = JSON.parse(isLocalData);
  //   const isUserFound = users.find((m: any) => m.userID == this.userObj.userID && m.pass == this.userObj.pass)
  //   if (isUserFound != undefined){
  //     this.router.navigateByUrl('menu')
  //   } else {
  //     alert("Numero de reloj o contraseña erroneas")
  //   }
  // } else {
  //   alert("No se encontro el usuario")
  // }

  // onRegister() {
  // const isLocalData = localStorage.getItem("angular18Local")
  // if (isLocalData != null) {
  //   const localArray = JSON.parse(isLocalData);
  //   localArray.push(this.userObj);
  //   localStorage.setItem("angular18Local", JSON.stringify(localArray))
  // } else {
  //   const localArray = [];
  //   localArray.push(this.userObj);
  //   localStorage.setItem("angular18Local", JSON.stringify(localArray))
  // }
  // alert("Registration Success")
