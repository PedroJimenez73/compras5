import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AutenticacionService } from './servicios/autenticacion.service'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private autService: AutenticacionService, 
              private router: Router, 
              private activatedRouter: ActivatedRoute) { }

  ngOnInit () { 
    firebase.initializeApp({ 
      apiKey: 'AIzaSyBOjmqvYoPh759lUw5wV7CLgoIuYe0NF_E', 
      authDomain: 'appcompras-1917c.firebaseapp.com' }); 
  }

  isAuth() {
    return this.autService.isAuth(); 
  }

  onLogout() { 
    this.autService.logout(); 
    this.router.navigate(['/inicio'])
  }
}
