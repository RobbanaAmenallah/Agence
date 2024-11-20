import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private http: HttpClient) {}
    getAllProperties(){
      return this.http.get<any>('http://localhost:3000/properties');
    }
  }

