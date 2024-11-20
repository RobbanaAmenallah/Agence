import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  adduser(user: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role : string;
  }) {
    return this.http.post<any>('http://localhost:3000/user/signup', user);
  }


  searchuser(user: {
    email: string;
    password: string;
  }) {
    return this.http.post<any>('http://localhost:3000/user/signin', user);
  }
  isLoggedIn() : Boolean {
    const Token = localStorage.getItem('token')
    if (Token) {
      return true;
    } else {
      return false;
    }

  }

}