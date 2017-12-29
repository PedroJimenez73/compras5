import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verpro',
  templateUrl: './verpro.component.html',
  styleUrls: ['./verpro.component.css']
})
export class VerproComponent implements OnInit {

  proveedor:any;
  
  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);
  }

  getId(id) {
    return this.http.get('http://localhost:3000/proveedor/'+id)
               .subscribe(data => {
                  this.proveedor = data;
                  console.log(this.proveedor);
               });
  }

}
