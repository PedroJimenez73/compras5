import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-listapro',
  templateUrl: './listapro.component.html',
  styleUrls: ['./listapro.component.css']
})
export class ListaproComponent implements OnInit {

  proveedores: any;
  campoBusqueda: FormControl; 
  busqueda: string;
  localidad: string;
  sinresultados:boolean = false;
  
  constructor(//private presupuestosService: PresupuestosService
              private http: HttpClient) { }

  ngOnInit() {
    this.campoBusqueda = new FormControl();
    this.campoBusqueda.valueChanges
          .subscribe(busqueda => {
            if (busqueda.length !== 0) {
              return this.http.get('http://localhost:3000/proveedorsearch/'+busqueda)
                       .subscribe(res => {
                                    this.proveedores = res; 
                                    if(this.proveedores.length === 0){
                                      this.sinresultados = true;
                                    } else {
                                      this.sinresultados = false;
                                    }
                                  }, (err) => {
                                    console.log(err);
                                  }); 
                              } else {
                                this.proveedores = [];
                              }
          });
  }
  

}
