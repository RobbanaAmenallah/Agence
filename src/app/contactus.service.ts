import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http: HttpClient) { }

  // Get all contact messages
  getAllMessages() {
    return this.http.get<any>('http://localhost:3000/contactus');
  }

  // Submit a new contact message
  addMessage(messageData: {
    fullname: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return this.http.post<any>('http://localhost:3000/contactus', messageData);
  }

  // Delete a contact message by ID
  deleteMessage(id: string) {
    return this.http.delete<any>(`http://localhost:3000/contactus/${id}`);
  }

  // Get a single contact message by ID
  getMessageById(id: string) {
    return this.http.get<any>(`http://localhost:3000/contactus/${id}`);
  }

  // Update a contact message by ID
  updateMessage(id: string, messageData: {
    fullName?: string;
    email?: string;
    subject?: string;
    message?: string;
  }) {
    return this.http.patch<any>(`http://localhost:3000/contactus/${id}`, messageData);
  }
}
