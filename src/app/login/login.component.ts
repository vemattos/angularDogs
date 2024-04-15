import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string | undefined;
  senha:string | undefined;

  constructor(private router: Router){

  }

  onSubmit() {
    let nomeUsuario = (<HTMLInputElement>document.getElementById("username")).value;
    let senha = (<HTMLInputElement>document.getElementById("password")).value;

    if (nomeUsuario === "adm" && senha === "123") {
      this.router.navigate(['/dogs']);
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
  }
}
