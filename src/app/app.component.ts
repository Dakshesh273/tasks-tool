import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasks-tool';
  isLogin: any;
  user: any;
  email: any;

constructor(private afAuth: AngularFireAuth,
  private router: Router){}

ngOnInit(){
  if(localStorage.getItem("isLoggedin")){
    this.isLogin = true;
    this.email = localStorage.getItem("email");
  }
  this.afAuth.user.subscribe(user => {
    if (user){
      this.isLogin = true;
      this.email = user.email;
      localStorage.setItem("isLoggedin", 'true');
      localStorage.setItem("email", user.email);
    }
    else{
      this.isLogin = false;
      localStorage.clear(); 
    }
});
}

logout() {
  this.afAuth.signOut();
  this.router.navigate(['/login'], { replaceUrl: true });
}
}
