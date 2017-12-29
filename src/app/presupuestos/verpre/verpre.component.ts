import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-verpre',
  templateUrl: './verpre.component.html',
  styleUrls: ['./verpre.component.css']
})
export class VerpreComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto:any;
  importe: any; 
  tipo: any; 
  iva: any = 0; 
  total: any = 0;
  id: any;

  constructor(private pf: FormBuilder,
              //private presupuestosService: PresupuestosService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);    
    this.presupuestoForm = this.pf.group({ 
      proveedor: null, 
      fecha: null,
      concepto: null, 
      importe: null,
      tipo: null, 
      iva: this.iva,
      total: this.total
    });
  }

  getId(id) {
    return this.http.get('http://localhost:3000/presupuesto/'+id)
               .subscribe(data => {
                  this.presupuesto = data;
               });
  }

 

}
