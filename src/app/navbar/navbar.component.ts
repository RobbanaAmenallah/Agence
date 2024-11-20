import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn! : Boolean;
  router : Router | undefined

  constructor(private userService: UserService){
    this.isLoggedIn = this.userService.isLoggedIn();
  }
  Logout(){
    localStorage.removeItem('token')  
    this.isLoggedIn=false
  }
}
