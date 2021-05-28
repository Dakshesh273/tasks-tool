import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 errorMessage = '';
 constructor(private afAuth: AngularFireAuth,
   private router: Router,
   private fb: FormBuilder,
   private ngZone: NgZone) { }

 loginForm = this.fb.group({
   email: ['', Validators.required],
   password: ['', Validators.required]
 })

 ngOnInit() {
  } 

 createUser() {
  this.afAuth.createUserWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
     this.router.navigate(['/todo-list']);
   }).catch(response => {
     this.errorMessage = response.message;
   });
 } 

 signIn() { 
  this.afAuth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(() => {
     this.router.navigate(['/todo-list']);
   }).catch(response => {
     this.errorMessage = response.message;
     console.log(this.errorMessage);
   });
  }
}