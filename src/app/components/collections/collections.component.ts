import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';
import { VentaService } from '../service/venta.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {
  misCompras: any[] = [];
  producto: any;

  constructor(private ventaService: VentaService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.producto = nav?.extras?.state?.['producto'];
  }

  ngOnInit(): void{
    const navigation = this.router.getCurrentNavigation();
    this.producto = navigation?.extras.state?.['producto'];

    if(this.producto){
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const username = currentUser.username;

       const nuevaVenta = {
        nombreProducto: this.producto.name,
        autor: this.producto.autor,
        categoria: this.producto.categoria,
        precio: this.producto.precio,
        imagen: this.producto.imagen,
        comprador: username,
        fecha: new Date()

    };

    this.ventaService.registrarVenta(nuevaVenta).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Compra registrada correctamente', 'success');
        this.cargarCompras(username);
      },
      error: (error) => {
        console.log('Error al registrar la compra:', error);
        Swal.fire('Error', 'No se pudo registrar la compra', 'error');
      }
    });

    
  }
}
  cargarCompras(username: string): void {
  this.ventaService.obtenerVentasPorComprador(username).subscribe({
    next: (compras: any) => {
      this.misCompras = compras;
    },
    error: (error) => {
      console.log('Error al obtener compras:', error);
      Swal.fire('Error', 'No se pudieron cargar las compras', 'error');
    }
  });
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
    this.misCompras.splice(index, 1);
    Swal.fire({
      icon: 'success',
      title: '¡Compra eliminada!',
      text: 'La compra se ha eliminado correctamente',
      timer: 4500,
      showConfirmButton: true,
    });
  }

}
