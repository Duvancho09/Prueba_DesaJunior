import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileImage: string = 'assets/imgs/perfil.png';
  userData: any;

  constructor(private router: Router){}

  dateProfileForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  ngOnInit(){
    const storedData = localStorage.getItem('userData');
    // if (!this.userData){
    //   window.location.replace('/');
    // }
    if (storedData){
      const userData = JSON.parse(storedData);
      this.dateProfileForm.patchValue({
        username: userData.username || '',
        email: userData.email || '',
        password: userData.password || '',
        confirmPassword: userData.confirmPassword || ''
      });
      this.userData = JSON.parse(storedData);
    }
  }

  triggerFileInput(){}

  guardarDatos(){
    if (this.dateProfileForm.valid){
      const updatedData = this.dateProfileForm.value;
      localStorage.setItem('userData', JSON.stringify(updatedData));
      // console.log(updatedData)
      Swal.fire({
        icon: 'success',
        title: '¡Datos actualizados!',
        text: 'Tus datos fueron actualizados correctamente',
        showConfirmButton: true
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar datos',
        text: 'Por favor revisa y completa todos los campos correctamente',
        showConfirmButton: true
      });
    }
  }

  eliminarCuenta(){
    Swal.fire({
      icon: 'warning',
      title: '¿Estas seguro de eliminar la cuenta?',
      text: 'Esto eliminara tu cuenta y no podras recuperarla',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        localStorage.removeItem('userData');

        window.location.replace('/');

        // this.router.navigate(['']).then(() => {
        //   window.location.replace('/login');
        // });
      }
    });
  }

}
