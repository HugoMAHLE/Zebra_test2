import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from "axios"

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

  apiURL = 'http://localhost:3000/api/v1/'

  async onLogin() {
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
    const userid: any = this.userObj.userID
    const pass: any = this.userObj.pass

    try {
      const {data} = await axios.post(this.apiURL + "users/login", {userid, pass})
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async onRegister() {
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

    const userid: any = this.userObj.userID
    const pass: any = this.userObj.pass
    const email: any = this.userObj.email

    try {
      console.log(1)
      const {data} = await axios.post(this.apiURL + "users/register", {userid, email, pass})
      console.log(2)
      console.log(data)
      alert("Registration Success")
    } catch (error) {
      console.log(error)
    }
  }

}
