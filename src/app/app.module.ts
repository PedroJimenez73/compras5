import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListapreComponent } from './presupuestos/listapre/listapre.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { CrearpreComponent } from './presupuestos/crearpre/crearpre.component';
import { VerpreComponent } from './presupuestos/verpre/verpre.component';
import { EditpreComponent } from './presupuestos/editpre/editpre.component';

const routes: Routes = [
  { path: '', component: InicioComponent  },
  { path: 'presupuestos', component: ListapreComponent },
  { path: 'crear-presupuesto', component: CrearpreComponent },
  { path: 'ver-presupuesto/:id', component: VerpreComponent },
  { path: 'editar-presupuesto/:id', component: EditpreComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListapreComponent,
    CrearpreComponent,
    VerpreComponent,
    EditpreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PresupuestosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
