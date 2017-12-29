import { Component, OnInit } from '@angular/core';
//import { PresupuestosService } from '../../servicios/presupuestos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listapre',
  templateUrl: './listapre.component.html',
  styleUrls: ['./listapre.component.css']
})
export class ListapreComponent implements OnInit {

  presupuestos: any;
  suma: any;
  
  constructor(//private presupuestosService: PresupuestosService
              private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/presupuesto')
      .subscribe(data => {
        this.presupuestos = data;
        var suma = 0;
        for (var i=0;i<this.presupuestos.length; i++) {
          suma = suma + this.presupuestos[i].total;
        }
        this.suma = suma;
      });

    
  }

}
