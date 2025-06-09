import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl,FormGroup, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  }, this.passwordsMatch);

   passwordsMatch(formGroup: AbstractControl): { [key: string]: boolean } | null {
  const password = formGroup.get('password')?.value;
  const confirmpassword = formGroup.get('confirmpassword')?.value;
  return password === confirmpassword ? null : { passwordMismatch: true };
}


  constructor(private router: Router, private http: HttpClient){}

  registrarse(){
    this.http.post('http://localhost:8080/api/vendedores', this.registerForm.value).subscribe({
      next: res => {
        console.log('Conectado y registrado en la base de datos', res);
      },
      error: err => {
        console.log('Error al conectar o registrar los datos', err);
      }
    });
    if (this.registerForm.valid){
      console.log(this.registerForm.value);
      let data = this.registerForm.value
      localStorage.setItem('userData', JSON.stringify(data));
      Swal.fire(
        'Datos registrados correctamente',
        'Inicia sesión para disfrutar de la página y las cosas que trae para ti!!!',
        'success'
      )
      this.router.navigate([''])
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Por revisa todos los campos',
        text: '¡Los campos estan vacios o no son validos!',
      })
    }
  }

}
