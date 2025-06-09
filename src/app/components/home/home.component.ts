import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../service/shared.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { Producto, ProductoService } from '../service/producto.service';
import { HttpClient } from '@angular/common/http';

interface Image {
  name: string;
  autor: string;
  imagen: string;
  categoria: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  misCreaciones: any[] = [];
  usuario: string | null = null;
  mostrarTarjetas = false;
  productos: Producto[] = [];

  constructor(private sharedService: SharedService, private router: Router, private productoService: ProductoService, private http: HttpClient){}
  
  ngOnInit(): void{
    const usuario = JSON.parse(localStorage.getItem('usuario')!);

    this.http.get<any[]>('http://localhost:8080/api/productos').subscribe(data => {
      this.misCreaciones = data.filter(p => p.autor === usuario.username);
      this.filteredImages = data.filter(p => p.autor !== usuario.username);
      console.log('Productos de otros usuarios:', this.filteredImages)
    });

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado){
      const userData = JSON.parse(usuarioGuardado);
      this.usuario = userData.username;
      
      this.productoService.obtenerTodos().subscribe(data => {
        console.log('Todos los productos:', data);
        this.misCreaciones = data;
        console.log('Usuario logueado:', this.usuario);
        this.misCreaciones = data.filter(p => p.autor === this.usuario);
        console.log('Filtrados por autor:', this.misCreaciones);
      });
    }

    this.sharedService.mostrarTarjetas$.subscribe((mostrar) =>{
      this.mostrarTarjetas = mostrar;
    });
  }

  images = [
    { name: 'Computador Gaming 1', categoria: 'Gama Media', autor: 'Duvan Rodriguez', imagen: 'assets/imgs/pcgamer2.jpg' },
    { name: 'Compuptador Gaming 2', categoria: 'Gama Alta', autor: 'Esteban Ortiz', imagen: 'assets/imgs/pcgamer3.jpg' },
    { name: 'Compuptador Gaming 3', categoria: 'Gama Baja', autor: 'Daniel Ramirez', imagen: 'assets/imgs/pcgamer4.jpg' },
    { name: 'Compuptador Gaming 4', categoria: 'Gama Media', autor: 'Eugenio Martinez', imagen: 'assets/imgs/pcgamer5.webp' },
    { name: 'Compuptador Gaming 5', categoria: 'Gama Alta', autor: 'Jhon Suarez', imagen: 'assets/imgs/pcgamer6.gif' },
    { name: 'Compuptador Gaming 6', categoria: 'Gama Baja', autor: 'Oscar Velasquez', imagen: 'assets/imgs/pcgamer7.jpg' },
  ];

  filteredImages = [...this.images];

  toggleTarjetas(){
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  compraImagen(image: any){
    this.router.navigate(['/home'], { state: {producto: image } });
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada con éxito',
      showConfirmButton: true
    });

    this.filteredImages = this.filteredImages.filter(img => img !== image);

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const username = currentUser.username;

    let userPurchases = JSON.parse(localStorage.getItem('purchases') || '{}');

    if (!userPurchases[username]){
      userPurchases[username] = [];
    }

    userPurchases[username].push(image);

    localStorage.setItem('purchases', JSON.stringify(userPurchases));
  }

  cargarMisCreaciones(): void {
    this.productoService.obtenerTodos().subscribe((productos) => {
      const usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.misCreaciones = productos.filter(p => p.autor === usuario.username);
    });
  }
  
  Confirmar(id: number): void{
    Swal.fire({
      title: '¿Esta seguro de eliminar esta creación?',
      text: 'Esta acción eliminará la creación de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        this.productoService.eliminar(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'ELIMINADO',
            text: 'Tu creacion ha sido eliminada',
            timer: 4500,
            showCloseButton: true
          });
        // }, () => {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'ERROR',
        //     text: 'Hubo un error al eliminar el producto'
        //   });
        // }
        this.cargarMisCreaciones();
        }
      );
      }
    });
  }
}