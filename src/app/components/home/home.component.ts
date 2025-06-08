import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../service/shared.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Image {
  name: string;
  author: string;
  url: string;
  category: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  misCompras: any[] = [];
  misCreaciones: any[] = [];
  usuario: string | null = null;
  mostrarTarjetas = false;

  constructor(private sharedService: SharedService, private router: Router){}
  
  ngOnInit(){
    this.misCreaciones = JSON.parse(localStorage.getItem('creacion') || '[]');
    this.sharedService.mostrarTarjetas$.subscribe((mostrar) =>{
      this.mostrarTarjetas = mostrar;
    })
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado){
      const userData = JSON.parse(usuarioGuardado);
      this.usuario = userData.username;
    }
  }

  images = [
    { name: 'Computador Gaming 1', category: 'Gama Media', author: 'Duvan Rodriguez', url: 'assets/imgs/pcgamer2.jpg' },
    { name: 'Compuptador Gaming 2', category: 'Gama Alta', author: 'Esteban Ortiz', url: 'assets/imgs/pcgamer3.jpg' },
    { name: 'Compuptador Gaming 3', category: 'Gama Baja', author: 'Daniel Ramirez', url: 'assets/imgs/pcgamer4.jpg' },
    { name: 'Compuptador Gaming 4', category: 'Gama Media', author: 'Eugenio Martinez', url: 'assets/imgs/pcgamer5.webp' },
    { name: 'Compuptador Gaming 5', category: 'Gama Alta', author: 'Jhon Suarez', url: 'assets/imgs/pcgamer6.gif' },
    { name: 'Compuptador Gaming 6', category: 'Gama Baja', author: 'Oscar Velasquez', url: 'assets/imgs/pcgamer7.jpg' },
  ];

  filteredImages = [...this.images];

  toggleTarjetas(){
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  compraImagen(image: any){
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

  Actualizar(index: number){
    localStorage.setItem('creacionEditarIndex', index.toString());
    this.router.navigate(['/update']);
  }
  
  Confirmar(index: number): void{
    Swal.fire({
      title: '¿Esta seguro de eliminar esta compra?',
      text: 'Esta acción eliminará la compra de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        this.eliminarCompra(index);
      }
    });
  }
  
  eliminarCompra(index: number): void{
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const username = currentUser.username;
    
    this.misCompras.splice(index, 1);
    
    const purchases = JSON.parse(localStorage.getItem('purchases') || '{}');
    purchases[username] = this.misCompras;
    localStorage.setItem('purchases', JSON.stringify(purchases));
    
    Swal.fire({
      icon: 'success',
      title: '¡Compra eliminada!',
      text: 'La compra se ha eliminado correctamente',
      timer: 4500,
      showConfirmButton: true,
    });
  }
}