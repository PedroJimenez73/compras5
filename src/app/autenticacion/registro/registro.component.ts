import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  userdata:any;
  emailused:boolean = false;

  constructor(private rf: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.registroForm = this.rf.group(
      { 'email': ['', [ Validators.required, Validators.email ] ], 
        'password': ['', [ Validators.required, 
                           Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6) ] ],
        'confirm':''
      });
  }

  onSubmit() { 
    this.userdata = this.saveUserdata(); 
    console.log(this.userdata);
    firebase.auth().createUserWithEmailAndPassword(this.userdata.email, this.userdata.password)
              .then(res => {
                this.router.navigate(['/inicio']);
              })
              .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if ( errorCode == 'auth/email-already-in-use') {
                  this.emailused = true;
                } else {
                  alert(errorMessage);
                }
              })
  }

  saveUserdata() {
    
    const saveUserdata = {
      email: this.registroForm.get('email').value, 
      password: this.registroForm.get('password').value
    }; 
    return saveUserdata;    
  }    
}

// npm install firebase angularfire2 --save
