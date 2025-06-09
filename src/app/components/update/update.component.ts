import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-update',
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  creacion: any = {};
  file: File | null = null;
  id!: number;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam){
        this.id =Number(idParam);
        console.log('ID recibido desde la ruta:', this.id);
        this.http.get(`http://localhost:8080/api/productos/${this.id}`).subscribe((data: any) => {
          this.creacion = data;
        });
      } else {
        console.log('ID no encontrado en la ruta');
      }
    });
  }

  getImagenUrl(): string{
    if (this.creacion.imagen?.startsWith('data:image')) {
      return this.creacion.imagen;
    }
    return `http://localhost:8080/uploads/${this.creacion.imagen}`;
  }

  onFileChange(event: any): void{
    const file = event.target.files[0];
    if(file){
      this.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.creacion.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    };
  }

  actualizarCreacion(): void{
    const formData = new FormData();
    formData.append('nombre', this.creacion.nombre);
    formData.append('autor', this.creacion.autor);
    formData.append('categoria', this.creacion.categoria);
    formData.append('precio', this.creacion.precio.toString());
    
    if(this.file){
      formData.append('imagen', this.file, this.file.name);
    };

    this.http.put(`http://localhost:8080/api/productos/${this.creacion.id}`, formData). subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Creación actualizada!',
          text: 'La creacion se actualizo correctamente',
          timer: 4500,
          showConfirmButton: true
        });
        this.router.navigate(['/home']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la creacion'
        });
      }
    });
  }
}