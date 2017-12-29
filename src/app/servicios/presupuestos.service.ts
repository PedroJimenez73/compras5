import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PresupuestosService {

  constructor(private http: HttpClient) { }

  getPresupuestos() {
    return this.http.get('http://localhost:3000/presupuesto');
  }

  getPresupuestoDetalle(id) {
    return this.http.get('http://localhost:3000/presupuesto/'+id);
  }

  postPresupuesto(presupuesto) {
    return this.http.post('http://localhost:3000/presupuesto', presupuesto)
  }

  // putPresupuesto(presupuesto, id) {
  //   return this.http.put('http://localhost:3000/presupuesto/'+id, presupuesto);
  // }

  deletePresupuesto(id) {
    return this.http.delete('http://localhost:3000/presupuesto/'+id);
  }

}
