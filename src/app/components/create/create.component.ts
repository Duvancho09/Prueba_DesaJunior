import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  file!: File;

  constructor(private router: Router, private http: HttpClient){}


  dataForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    autor: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    categoria: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    precio: new FormControl('', [Validators.required]),
    url: new FormControl('')
  });

  onFileChange(event: any){
    const file = event.target.files[0];
    this.file = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.dataForm.get('url')?.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  guardarCreacion(){
    const formData = new FormData();
    formData.append('nombre', String(this.dataForm.get('name')?.value || ''));
    formData.append('autor', String(this.dataForm.get('autor')?.value || ''));
    formData.append('categoria', String(this.dataForm.get('categoria')?.value || ''));
    formData.append('precio', String(this.dataForm.get('precio')?.value || '0'));
    formData.append('imagen', this.file);
    
    this.http.post('http://localhost:8080/api/productos', formData)
    .subscribe({
      next: (response: any) => {
      console.log('Producto creado:', response);
      Swal.fire({
        icon: 'success',
        title: 'Producto creado',
        text: 'El producto se ha creado correctamente',
        timer: 4500,
        showCloseButton: true
      })
      this.router.navigate(['/home']);
      }, error: (error) => {
      console.error('Error al guardar producto:', error);
      }
    });

    // const formData = new FormData();
    // formData.append('nombre', String(this.dataForm.get('name')?.value || ''));
    // formData.append('autor', String(this.dataForm.get('autor')?.value || ''));
    // formData.append('categoria', String(this.dataForm.get('categoria')?.value || ''));
    // formData.append('precio', String(this.dataForm.get('precio')?.value || '0'));
    // formData.append('imagen', this.file);

    // this.http.post('http://localhost:8080/api/productos', formData)
    // .subscribe({
    //   next: res => {
    //     console.log('Producto creado:', res);
    //     this.router.navigate(['/home']);
    //   },
    //   error: err => console.log('Error al guardar producto:', err)
    // });

    // this.http.post('http://localhost:8080/api/productos', formData)
    // .subscribe((response: any) => {
    //   console.log('producto creado:', response);

    //   const id = response.id;
    //   if(id){
    //     this.router.navigate(['/update', id]);
    //   } else{
    //     console.error('No se pudo obtener el ID del producto creado');
    //   }
    // });
    // const create = JSON.parse(localStorage.getItem('creacion') || '[]');
    // create.push(this.dataForm.value);
    // localStorage.setItem('creacion', JSON.stringify(create));
    // this.router.navigate(['/home']);
  }

}
