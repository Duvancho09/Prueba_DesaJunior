import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';

const enterTransition = transition(':enter', [
  query('.animacion-entrada', [
  style({ transform: 'translateY(100%)',
  opacity: 0 }),
  stagger(100, [
    animate('0.5s ease-in', style({ transform: 'translateY(0)', opacity: 1}))
  ])
])
]);

const translateY = trigger('translateY', [enterTransition])

@Component({
  selector: 'navbar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [translateY]
})
export class NavbarComponent {
  compraUsuario: any[] = [];
  searchText: string = '';
  dropdownOpen: boolean = false;
  isMobileMenuOpen = false;
  dropdownOpen1 = false;
  
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router, private sharedService: SharedService){}

  ngOnInit(){
  }

  onProfileClick(){
    this.sharedService.toggleTarjetas();
  }

  filterImages() {
    console.log(`Filtrando imágenes por: ${this.searchText}`);
  }
}