import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  presupuestos: any;  
  campoBusqueda: FormControl; 
  busqueda: string;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.campoBusqueda = new FormControl();
    this.campoBusqueda.valueChanges
          .subscribe(busqueda => {
            if (busqueda.length !== 0) {
              return this.http.get('http://localhost:3000/presupuesto/'+busqueda).subscribe(data => {
                this.presupuestos = data;
                console.log(this.presupuestos);
              }); 
            } else {
              this.presupuestos = [];
            }
          });
  }

}
