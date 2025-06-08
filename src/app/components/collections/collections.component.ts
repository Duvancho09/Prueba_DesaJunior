import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collections',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {
  misCompras: any[] = [];

  ngOnInit(){
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const username = currentUser.username;

    const purchases = JSON.parse(localStorage.getItem('purchases') || '{}');
    this.misCompras = purchases[username] || [];
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
