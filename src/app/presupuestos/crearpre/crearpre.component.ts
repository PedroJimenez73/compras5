import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-crearpre',
  templateUrl: './crearpre.component.html',
  styleUrls: ['./crearpre.component.css']
})
export class CrearpreComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto:any;
  importe: any; 
  tipo: any; 
  iva: any = 0; 
  total: any = 0;
  error:boolean = false;
  enviado:boolean = false;
  proveedores:any;

  constructor(private pf: FormBuilder,
              private presupuestosService: PresupuestosService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.presupuestoForm = this.pf.group({ 
      proveedor: null, 
      fecha: null,
      concepto: null, 
      importe: null,
      tipo: null, 
      iva: this.iva,
      total: this.total
    });
    this.onChanges();
    this.http.get('http://localhost:3000/proveedor')
    .subscribe(data => {
      this.proveedores = data;
    }); 
  }

  onChanges(): void { 
    this.presupuestoForm.valueChanges.subscribe(valor => { 
      this.importe = valor.importe; 
      this.tipo = valor.tipo; 
      this.presupuestoForm.value.iva = this.importe * this.tipo;
      this.presupuestoForm.value.total = this.importe + (this.importe * this.tipo); 
    });
  }

  onSubmit(){
    this.presupuesto = this.savePresupuesto();
    this.http.post('http://localhost:3000/presupuesto', this.presupuesto)
          .subscribe(res => {
            this.presupuestoForm.reset();
            // setTimeout(() => {
            //   this.router.navigate(['/presupuestos']);
            // }, 2000);
          }, (err) => {
            this.error = true;
            console.log(err);
          }
        ); 
  }

  savePresupuesto() { 
    const savePresupuesto = { 
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,       
      concepto: this.presupuestoForm.get('concepto').value,
      importe: this.presupuestoForm.get('importe').value, 
      tipo: this.presupuestoForm.get('tipo').value, 
      iva: this.presupuestoForm.get('iva').value, 
      total: this.presupuestoForm.get('total').value
    }
    return savePresupuesto;
  }

}
