import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if(sessionStorage.getItem('token')!==null){
      return true;
    }
    return false;
  }

  canAccess(){
    if(!this.isAuthenticated()){
      this.router.navigate(['/login']);

    }
  }
  canAuthenticate(){
    if(this.isAuthenticated()){
      this.router.navigate(['/dashboard']);

    }

  }
  register(name:string,email:string,password:string){
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHV6u8QLgtmgCa_tm8_B9GsPvwvl1aPyk',
      {displayName:name,email,password}
      );
  }
  storeToken(token:string){
    sessionStorage.setItem('token',token);
  }
  login(email:string,password:string){
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHV6u8QLgtmgCa_tm8_B9GsPvwvl1aPyk',
      {email:email,password:password}
    );

  }
  details(){
    let token=sessionStorage.getItem('token');
    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAHV6u8QLgtmgCa_tm8_B9GsPvwvl1aPyk',
      {idToken:token}
    );
  }
  removeToken(){
    sessionStorage.removeItem('token')
  }
}
