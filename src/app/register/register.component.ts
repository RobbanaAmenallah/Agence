import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  RegisterForm: FormGroup;

  constructor(private userService: UserService) {
    this.RegisterForm = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[A-Za-z ]*')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [ // Changed from mdp to password
        Validators.required,
        Validators.minLength(6)
      ]),
      cmdp: new FormControl('', [Validators.required])
    });
  }

  get fullname() {
    return this.RegisterForm.get('fullname');
  }

  get email() {
    return this.RegisterForm.get('email');
  }

  get password() { // Changed from mdp to password
    return this.RegisterForm.get('password');
  }

  get cmdp() {
    return this.RegisterForm.get('cmdp');
  }
    get role() {
      return 'CLIENT';
    }

  addUser() {
    if (this.RegisterForm.valid) {
      const { fullname, email, password } = this.RegisterForm.value;

      // Split fullname into firstname and lastname
      const [firstname, ...lastnameParts] = fullname.split(' ');
      const lastname = lastnameParts.join(' ');

      const user = {
        firstname,
        lastname,
        email,
        password,
        role: this.role  // Setting role directly
      };

      this.userService.adduser(user).subscribe({
        next: (result) => {
          console.log("Utilisateur enregistré : ", result);
          this.RegisterForm.reset();
        },
        error: (err) => {
          console.error("Erreur lors de l'enregistrement : ", err);
        }
      });
    } else {
      console.log("Formulaire non valide");
    }
  }
}