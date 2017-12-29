import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private autService: AutenticacionService) { }

  ngOnInit() {
  }

  isAuth() {
    return this.autService.isAuth(); 
  }

}
