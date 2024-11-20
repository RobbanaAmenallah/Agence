import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {}
    getAllCategories(){
      return this.http.get<any>('http://localhost:3000/categories');
    }
  }

