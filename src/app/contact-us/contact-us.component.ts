import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactUsService } from '../contactus.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactUsForm: FormGroup = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[A-Za-z ]*')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[A-Za-z0-9 ]*')
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[A-Za-z0-9 ]*')
    ])
  });

  constructor(private contactUsService: ContactUsService) { }

  get fullname() {
    return this.contactUsForm.get('fullname');
  }

  get email() {
    return this.contactUsForm.get('email');
  }

  get subject() {
    return this.contactUsForm.get('subject');
  }

  get message() {
    return this.contactUsForm.get('message');
  }

  sendContactForm() {
    if (this.contactUsForm.valid) {
      try {
        const { fullname, email, subject, message } = this.contactUsForm.value;
  
        const contactMessage = {
          fullname,
          email,
          subject,
          message
        };
  
        this.contactUsService.addMessage(contactMessage).subscribe({
          next: (result) => {
            console.log('Message envoyé avec succès !', result);
            this.contactUsForm.reset(); // Réinitialiser le formulaire
          },
          error: (error) => {
            console.error('Erreur lors de l\'envoi du message:', error);
            if (error.error && error.error.message) {
              alert(error.error.message);
            }
          }
        });
      } catch (error) {
        console.error('Une erreur est survenue:', error);
        alert('Une erreur est survenue lors de l\'envoi du message.');
      }
    } else {
      console.log('Le formulaire est invalide');
    }
  }
}  