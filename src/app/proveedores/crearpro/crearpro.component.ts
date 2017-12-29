import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crearpro',
  templateUrl: './crearpro.component.html',
  styleUrls: ['./crearpro.component.css']
})
export class CrearproComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor:any;
  error:boolean = false;
  enviado:boolean = false;
  mensaje:any;

  constructor(private pf: FormBuilder,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.proveedorForm = this.pf.group({ 
      nombre: null, 
      cif: null,
      domicilio: null, 
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      mail: null
    });
  }

  onSubmit(){
    this.proveedor = this.saveProveedor();
    this.http.post('http://localhost:3000/proveedor', this.proveedor)
          .subscribe(res => {
            this.router.navigate(['/proveedores']);
          }, (err) => {
            this.error = true;
            console.log(err);
          }
        );  
  }

  saveProveedor() { 
    const saveProveedor = { 
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,       
      domicilio: this.proveedorForm.get('domicilio').value,
      cp: this.proveedorForm.get('cp').value, 
      localidad: this.proveedorForm.get('localidad').value, 
      provincia: this.proveedorForm.get('provincia').value, 
      telefono: this.proveedorForm.get('telefono').value,
      mail: this.proveedorForm.get('mail').value      
    }
    return saveProveedor;
  }

}
