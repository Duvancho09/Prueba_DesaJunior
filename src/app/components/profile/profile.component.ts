import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileImage: string = 'assets/imgs/perfil.png';
  userData: any;

  constructor(private router: Router, private vendedorService: VentaService){}

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
      this.userData = userData;

      this.dateProfileForm.patchValue({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      });
      // this.userData = JSON.parse(storedData);
    }
  }

  triggerFileInput(){}

  guardarDatos(){
    if(this.dateProfileForm.valid && this.userData){
      const id = this.userData.id;

      this.vendedorService.actualizarVendedor(id, this.dateProfileForm.value).subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Datos actualizados!',
          text: 'Tus datos fueron actualizados correctamente',
          showConfirmButton: true
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron actualizar los datos',
          showConfirmButton: true
      });
    }
  );
  }
}

  eliminarCuenta() {
  Swal.fire({
    icon: 'warning',
    title: '¿Estas seguro de eliminar la cuenta?',
    text: 'Esto eliminará tu cuenta permanentemente',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed && this.userData?.id) {
      this.vendedorService.eliminarVendedor(this.userData.id).subscribe(
        () => {
          Swal.fire('Eliminado', 'Tu cuenta fue eliminada', 'success');
          localStorage.removeItem('userData');
          window.location.replace('/');
        },
        (err) => {
          Swal.fire('Error', 'No se pudo eliminar tu cuenta', 'error');
        }
      );
    }
  });
}

}
