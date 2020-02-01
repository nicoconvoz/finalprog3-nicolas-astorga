
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public email: string = '';
  public password: string= ''; 
  ngOnInit() {
  }

  registerUser(email: string, pass: string){
    return new Promise ((resolve,reject) =>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData)),
      err=>reject(err);
    })
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
    .then((res)=>{
      this.onLoginRedirect();
    }).catch(err => console.log('err',err.message));
  }
  onLoginGoogle(): void{
    this.authService.loginGoogleUser()
    .then((res)=>{
      console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err=>console.log('err',err.message));

  }
  onLoginFacebook(): void{
    this.authService.loginFacebookUser()
    .then((res)=>{
      this.onLoginRedirect();
    }).catch (err => console.log('err', err.message));
  }
  onLogout(){
    this.authService.logoutUser();
  }

  onLoginRedirect(): void{
    this.router.navigate(['admin/list-books']);
  }

}