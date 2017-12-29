import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  buscadorForm: FormGroup;
  proveedores:any;
  datos:any;
  error:boolean = false;

constructor(private bf: FormBuilder,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.buscadorForm = this.bf.group({ 
      nombre: null, 
      localidad: null,
    });
  }

  onSubmit(){
    this.datos = this.saveDatos();
    this.http.get('http://localhost:3000/proveedorbusca/'+this.datos.nombre+"/"+this.datos.localidad)
          .subscribe(res => {
            this.proveedores = res;
            console.log(this.proveedores);
            this.error = false;
          }, (err) => {
            console.log(err);
            this.error = true;
          }
        );  
  }

  saveDatos() { 
    const saveDatos = { 
      nombre: this.buscadorForm.get('nombre').value,
      localidad: this.buscadorForm.get('localidad').value,      
    }
    return saveDatos;
  }

}
