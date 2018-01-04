import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

import { FacturasModule } from './facturas/facturas.module';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListapreComponent } from './presupuestos/listapre/listapre.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { CrearpreComponent } from './presupuestos/crearpre/crearpre.component';
import { VerpreComponent } from './presupuestos/verpre/verpre.component';
import { EditpreComponent } from './presupuestos/editpre/editpre.component';
import { BuscadorComponent } from './presupuestos/buscador/buscador.component';
import { NumerosPipe } from './pipes/numeros.pipe';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { IniciosesComponent } from './autenticacion/inicioses/inicioses.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { GuardService } from './servicios/guard.service';
import { CrearproComponent } from './proveedores/crearpro/crearpro.component';
import { ListaproComponent } from './proveedores/listapro/listapro.component';
import { MiniloginComponent } from './autenticacion/minilogin/minilogin.component';
import { VerproComponent } from './proveedores/verpro/verpro.component';
import { BuscaComponent } from './proveedores/busca/busca.component';

const routes: Routes = [
  { path: '', component: InicioComponent  },
  { path: 'presupuestos', component: ListapreComponent, canActivate:[GuardService] },
  { path: 'crear-presupuesto', component: CrearpreComponent, canActivate:[GuardService] },
  { path: 'ver-presupuesto/:id', component: VerpreComponent, canActivate:[GuardService] },
  { path: 'buscar-presupuesto', component: BuscadorComponent, canActivate:[GuardService] },
  { path: 'editar-presupuesto/:id', component: EditpreComponent, canActivate:[GuardService] },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'inicio-sesion', component: IniciosesComponent },
  { path: 'proveedores', component: ListaproComponent, canActivate:[GuardService] },
  { path: 'buscar-proveedores', component: BuscaComponent },  
  { path: 'crear-proveedor', component: CrearproComponent, canActivate:[GuardService] },
  { path: 'ver-proveedor/:id', component: VerproComponent, canActivate:[GuardService] },  
  { path: '**' , component: InicioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListapreComponent,
    CrearpreComponent,
    VerpreComponent,
    EditpreComponent,
    BuscadorComponent,
    NumerosPipe,
    RegistroComponent,
    IniciosesComponent,
    CrearproComponent,
    ListaproComponent,
    MiniloginComponent,
    VerproComponent,
    BuscaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FacturasModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [PresupuestosService, 
              AutenticacionService,
              GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
