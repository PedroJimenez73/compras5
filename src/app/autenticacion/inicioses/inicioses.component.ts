import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-inicioses',
  templateUrl: './inicioses.component.html',
  styleUrls: ['./inicioses.component.css']
})
export class IniciosesComponent implements OnInit {

  inicioForm: FormGroup;
  userdata:any;
  nomail:boolean = false;
  nopass:boolean = false;

  constructor(private inf: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.inicioForm = this.inf.group(
      { 'email': ['', [ Validators.required, Validators.email ] ], 
        'password': ['', [ Validators.required, 
                           Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6) ] ]
      });
  }

  onSubmit() { 
    this.userdata = this.saveUserdata(); 
    firebase.auth().signInWithEmailAndPassword(this.userdata.email, this.userdata.password)
              .then(res => {
                this.router.navigate(['/inicio']);
              })
              .catch(error => {
                var errorCode = error.code;
                console.log(error.code);
                var errorMessage = error.message;
                if ( errorCode == 'auth/user-not-found') {
                  this.nomail = true;
                } else if (errorCode == 'auth/wrong-password') {
                  this.nopass = true;
                  this.nomail = false;
                } else if (errorCode == 'auth/invalid-mail'){
                  console.log(errorMessage);
                } else {
                  console.log(errorMessage);
                }
              })
  }

  saveUserdata() {
    
    const saveUserdata = {
      email: this.inicioForm.get('email').value, 
      password: this.inicioForm.get('password').value
    }; 
    return saveUserdata;    
  }    

}
