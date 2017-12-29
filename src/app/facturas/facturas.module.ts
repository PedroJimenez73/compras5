import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GuardService } from '../servicios/guard.service';

import { FacturasComponent } from './facturas/facturas.component';
import { CrearfraComponent } from './crearfra/crearfra.component';
import { VerfraComponent } from './verfra/verfra.component';
import { EditfraComponent } from './editfra/editfra.component';
//import { NumerosPipe } from '../pipes/numeros.pipe';

const routes: Routes = [
  { path: 'facturas', component: FacturasComponent, canActivate:[GuardService] },       
  { path: 'crear-factura', component: CrearfraComponent } ,
  { path: 'ver-factura/:id', component: VerfraComponent },  
  { path: 'editar-factura/:id', component: EditfraComponent }  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [FacturasComponent, CrearfraComponent, VerfraComponent, EditfraComponent]
})
export class FacturasModule { }
