import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Venta {
  id?: number;
  productoId: number;
  vendedorId: number;
  comprador: string;
  nombreProducto: string;
  autor: string;
  imagen: string;
  categoria: string;
  precio: number;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private url = 'http://localhost:8080/api/ventas';

  constructor(private http: HttpClient) {}

  actualizarVendedor(id: number, data: any){
  return this.http.put(`http://localhost:8080/api/vendedores/${id}`, data);
}

eliminarVendedor(id: number): Observable<any> {
  return this.http.delete(`${this.url}/vendedores/${id}`);
}

  registrarVenta(venta: any): Observable<any> {
    return this.http.post(this.url, venta);
  }

  obtenerVentasPorComprador(comprador: string): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.url}/${comprador}`);
  }
}
