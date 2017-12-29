import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verfra',
  templateUrl: './verfra.component.html',
  styleUrls: ['./verfra.component.css']
})
export class VerfraComponent implements OnInit {

  facturaForm: FormGroup;
  factura:any;

  constructor(private ff: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,              
              private http: HttpClient) { }

  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);        
    this.facturaForm = this.ff.group({ 
      cliente: null, 
      fecha: null,
      items: this.ff.array([
        this.initItems(),
      ]),
      base: null,
      tipo: null, 
      iva: null,
      total: null
    });
  }

  initItems() {
    return this.ff.group({
        producto: null,
        importe: null
    });
  }

  getId(id) {
    return this.http.get('http://localhost:3000/factura/'+id)
               .subscribe(data => {
                  this.factura = data;
               });
  }


}
