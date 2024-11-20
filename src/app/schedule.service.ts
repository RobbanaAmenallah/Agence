import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/schedule';

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
  createSchedule(scheduleData: any): Observable<any> {
    return this.http.post(this.apiUrl, scheduleData);
  }
}
