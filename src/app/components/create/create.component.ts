import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private router: Router){}


  dataForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    author: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    category: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    price: new FormControl('', [Validators.required]),
    url: new FormControl('')
  });

  onFileChange(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.dataForm.get('url')?.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  guardarCreacion(){
    const create = JSON.parse(localStorage.getItem('creacion') || '[]');
    create.push(this.dataForm.value);
    localStorage.setItem('creacion', JSON.stringify(create));
    this.router.navigate(['/home']);
  }

}
