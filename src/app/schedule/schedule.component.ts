import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  appointments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    // Fetch the appointments from the backend
    this.http.get<any[]>('http://localhost:3000/schedule').subscribe(
      (data) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

  acceptAppointment(id: number) {
    this.updateAppointmentStatus(id, 'Accepted');
  }

  rejectAppointment(id: number) {
    this.updateAppointmentStatus(id, 'Rejected');
  }

  updateAppointmentStatus(id: number, status: string) {
    // Send a PATCH request to update the status
    this.http.patch(`http://localhost:3000/schedule/${id}/status`, { status }).subscribe(
      (updatedAppointment) => {
        // Update the local appointment list with the new status
        const appointment = this.appointments.find(app => app._id === id);
        if (appointment) {
          appointment.status = status;
        }
      },
      (error) => {
        console.error('Error updating appointment status', error);
      }
    );
  }
}
