import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  creacion: any = {};
  index: number = -1;

  constructor(private router: Router){}

  ngOnInit(){
    this.index = +localStorage.getItem('creacionEditarIndex')!;
    const creaciones = JSON.parse(localStorage.getItem('creacion') || '[]');
    this.creacion = {...creaciones[this.index]};
  }

  onFileChange(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.creacion.url = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  actualizarCreacion(){
    const creaciones = JSON.parse(localStorage.getItem('creacion') || '[]');
    creaciones[this.index] = this.creacion;
    localStorage.setItem('creacion', JSON.stringify(creaciones));
    this.router.navigate(['/home']);
    Swal.fire({
      icon: 'success',
      title: '¡Creación actualizada!',
      text: 'La creación se actualizo correctamente',
      timer: 4500,
      showConfirmButton: true
    })
  }

}
