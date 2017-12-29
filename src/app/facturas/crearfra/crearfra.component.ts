import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crearfra',
  templateUrl: './crearfra.component.html',
  styleUrls: ['./crearfra.component.css']
})
export class CrearfraComponent implements OnInit {

  facturaForm: FormGroup;
  factura:any;
  base: any; 
  tipo: any; 
  iva: any = 0; 
  total: any = 0;
  items:any;

  constructor(private ff: FormBuilder,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.facturaForm = this.ff.group({ 
      cliente: null, 
      fecha: null,
      items: this.ff.array([
        this.initItem(),
      ]),
      base: null,
      tipo: null, 
      iva: this.iva,
      total: this.total
    });
    this.onChanges();
  }

  initItem() {
    return this.ff.group({
        producto: null,
        importe: null
    });
  }

  addItem() {
    const control = <FormArray>this.facturaForm.controls['items'];
    control.push(this.initItem());
  }

  removeItem(i: number) {
    const control = <FormArray>this.facturaForm.controls['items'];
    control.removeAt(i);
  }

  onChanges(): void { 
    this.facturaForm.valueChanges.subscribe(valor => {
    var a = 0;
      for (var i=0;i<valor.items.length; i++) {
        a = a + valor.items[i].importe;
      }
      this.base = a;
      this.facturaForm.value.base = a;
      this.tipo = valor.tipo; 
      this.facturaForm.value.iva = this.base * this.tipo;
      this.facturaForm.value.total = this.base + (this.base * this.tipo); 
    });
  }

  onSubmit(){
    this.factura = this.saveFactura();
    this.http.post('http://localhost:3000/factura', this.factura)
          .subscribe(res => {
            this.facturaForm.reset();
            // setTimeout(() => {
            //   this.router.navigate(['/presupuestos']);
            // }, 2000);
          }, (err) => {
            console.log(err);
          }
        ); 
  }

  saveFactura() { 
    const saveFactura = { 
      cliente: this.facturaForm.get('cliente').value,
      fecha: this.facturaForm.get('fecha').value,
      items: this.facturaForm.get('items').value,      
      base: this.facturaForm.get('base').value, 
      tipo: this.facturaForm.get('tipo').value, 
      iva: this.facturaForm.get('iva').value, 
      total: this.facturaForm.get('total').value
    }
    return saveFactura;
  }

}
