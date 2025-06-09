import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  dataForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)])
  });

  constructor(private router: Router, private http: HttpClient){}

  ingresar(){
    if(this.dataForm.valid){
      const loginData = this.dataForm.value;
      this.http.post<any>('http://localhost:8080/api/vendedores/login', loginData)
      .subscribe({
        next: res => {
          localStorage.setItem('usuario', JSON.stringify({ username: res.username }));
          Swal.fire(
            'Datos correctos',
            'Disfruta de la página y las cosas que trae para ti!!!',
            'success'
          );
          this.router.navigate(['/home']);
        },
        error: err => {
          if (err.status === 404) {
            Swal.fire({
              icon: 'warning',
              title: 'Usuario no encontrado',
              text: 'Regístrate para poder acceder.',
            });
          } else if (err.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Contraseña incorrecta',
              text: 'Revisa tus credenciales e intenta de nuevo.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error del servidor',
              text: 'Inténtalo más tarde.',
            });
          }
        }
      });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Formulario inválido',
      text: 'Por favor completa todos los campos correctamente.',
    });
    }
  }
  
  goToRegister() {
    this.router.navigate(['/register']);
  }

}
