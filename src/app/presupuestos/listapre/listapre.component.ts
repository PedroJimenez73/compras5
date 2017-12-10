import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-listapre',
  templateUrl: './listapre.component.html',
  styleUrls: ['./listapre.component.css']
})
export class ListapreComponent implements OnInit {

  presupuestos: any;
  
  constructor(private presupuestosService: PresupuestosService) { }

  ngOnInit() {
    this.presupuestosService.getPresupuestos()
      .subscribe(data => {
        this.presupuestos = data;
      });  
  }

}
