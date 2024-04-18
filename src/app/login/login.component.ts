import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario: string | undefined;
  senha: string | undefined;

  constructor(private router: Router){

  }

  onSubmit() {
    let nomeUsuario = (<HTMLInputElement>document.getElementById("username")).value;
    let senha = (<HTMLInputElement>document.getElementById("password")).value;

    if (nomeUsuario.length < 3) {
      alert("O nome de usuário deve conter pelo menos 3 caracteres");
      return;
    }

    if (senha.length < 3) {
      alert("A senha deve conter pelo menos 3 caracteres");
      return;
    }

    if (nomeUsuario === "adm" && senha === "123") {
      this.router.navigate(['/dogs']);
    } else {
      alert("Credenciais inválidas. Por favor, tente novamente.");
    }
}

  forgotPassword(){
    let nomeUsuario = (<HTMLInputElement>document.getElementById("username")).value;
    let senha = (<HTMLInputElement>document.getElementById("password")).value;

    alert(nomeUsuario + " sua senha é: " + senha);
  }

  cadastrar(){
    alert("Usuário cadastrado! -> Nome de usuário: adm | Senha: 123");
  }

//   onChecked() {
//     let rememberMe = (<HTMLInputElement>document.getElementById("remember")).checked;
//     if (rememberMe) {
//         let nomeUsuario = (<HTMLInputElement>document.getElementById("username")).value;
//         let senha = (<HTMLInputElement>document.getElementById("password")).value;
//         sessionStorage.setItem("username", nomeUsuario);
//         sessionStorage.setItem("password", senha);
//     } else {
//         sessionStorage.removeItem("username");
//         sessionStorage.removeItem("password");
//     }
// }

ngOnInit() {
//     let usernameSession = sessionStorage.getItem("username");
//     let passwordSession = sessionStorage.getItem("password");
//     if (usernameSession !== null && passwordSession !== null) {
//         (<HTMLInputElement>document.getElementById("username")).value = usernameSession;
//         (<HTMLInputElement>document.getElementById("password")).value = passwordSession;
//     }
}




}
