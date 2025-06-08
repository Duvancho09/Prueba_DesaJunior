import { CommonModule } from '@angular/common';
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

  constructor(private router: Router){}

  ingresar(){
    localStorage.setItem('usuario', JSON.stringify({ username: 'Daniel Ramirez' }));
    if(this.dataForm.valid){
      let data = this.dataForm.value
      console.log(data);
      Swal.fire(
        'Datos correctos',
        'Disfruta de la página y las cosas que trae para ti!!!',
        'success'
      )
      this.router.navigate(['/home']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Por favor revisa todos los campos',
        text: '¡Los campos estan vacios o no son validos!',
      })
    }
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }

}
