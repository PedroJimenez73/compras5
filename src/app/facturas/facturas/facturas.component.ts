import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

    facturas: any;
    
    constructor(private http: HttpClient) { }
  
    ngOnInit() {
      this.http.get('http://localhost:3000/factura')
        .subscribe(data => {
          this.facturas = data;
        });  
    }

}
