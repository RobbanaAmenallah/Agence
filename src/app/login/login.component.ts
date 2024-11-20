import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected this line
})
export class LoginComponent {
  LoginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get email() {
    return this.LoginForm.get('email');
  }

  get password() {
    return this.LoginForm.get('password');
  }

  loginUser() {
    if (this.LoginForm.valid) {
      const { email, password } = this.LoginForm.value;

      this.userService.searchuser({ email, password }).subscribe({
        next: (result) => {
          console.log(result); // Check the structure of result

          const token = result.token; // Extract the token from the result
          
          try {
            // Decode the token and extract role, userId, and email
            const decoded = jwtDecode(token) as { role: string; userId: string; email: string };

            // Access the user's email
            const userEmail = decoded.email; // Access the email here
            
            // Check if the user has the 'CLIENT' role
            if (decoded.role === 'CLIENT') {
              localStorage.setItem('token', token); // Store token in localStorage
              this.router.navigateByUrl('/'); // Redirect to home
            } else {
              console.error("Unauthorized role:", decoded.role); // Log unauthorized role
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        },
        error: (err) => {
          console.error("Login error:", err); // Handle errors from the server
          alert("Login failed. Please check your credentials."); // User-friendly error message
        }
      });
    } else {
      console.log("Form is not valid");
      alert("Please fill in all required fields correctly."); // User-friendly error message
    }
  }
}
