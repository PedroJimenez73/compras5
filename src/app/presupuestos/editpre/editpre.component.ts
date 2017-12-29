import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-editpre',
  templateUrl: './editpre.component.html',
  styleUrls: ['./editpre.component.css']
})
export class EditpreComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto:any;
  importe: any; 
  tipo: any; 
  iva: any = 0; 
  total: any = 0;
  id: any;

  constructor(private pf: FormBuilder,
              private presupuestosService: PresupuestosService,
              private router: Router,
              private http: HttpClient,
              private route: ActivatedRoute) { }

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
    this.onChanges();
  }

  getId(id) {
    this.http.get('http://localhost:3000/presupuesto/'+id).subscribe(data => {
      this.presupuesto = data;
      this.id = id;
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
    console.log(this.id);
    this.http.put('http://localhost:3000/presupuesto/'+this.id, this.presupuesto)
          .subscribe(res => {
            this.router.navigate(['/presupuestos']);
          }, (err) => {
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

  delPresupuesto(){
    this.presupuestosService.deletePresupuesto(this.id)
          .subscribe(res => {
            this.router.navigate(['/presupuestos']);
          }, (err) => {
            console.log(err);
          }
        );  
  }

}
