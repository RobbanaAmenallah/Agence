import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-propreties',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './propreties.component.html',
  styleUrl: './propreties.component.css'
})
export class PropretiesComponent {
  categoriesList = [
    { id: 0, name: "Show all" },
    { id: 1, name: "Apartement" },
    { id: 2, name: "Villa House" },
    { id: 3, name: "Penthouse" },

  ];


  tab: any[] = [
    { Title: "18 Old Street Miami, OR 97219li", price: 2264000, category: { id: 2, name: "Villa House" }, Bedrooms: 8, Bathrooms: 8, Area: 545, Floor: 3, Parking: 6 },
    { Title: "54 New Street Florida, OR 27001", price: 1180000, category: { id: 2, name: "Villa House" }, Bedrooms: 6, Bathrooms: 5, Area: 450, Floor: 3, Parking: 8 },
    { Title: "26 Mid Street Portland, OR 38540", price: 2264000, category: { id: 2, name: "Villa House" }, Bedrooms: 5, Bathrooms: 4, Area: 225, Floor: 3, Parking: 10 },
    { Title: "12 Hope Street Portland, OR 12650", price: 2264000, category: { id: 2, name: "Villa House" }, Bedrooms: 4, Bathrooms: 3, Area: 125, Floor: 25, Parking: 2 },
    { Title: "34 Hope Street Portland, OR 42680", price: 2264000, category: { id: 2, name: "Villa House" }, Bedrooms: 4, Bathrooms: 4, Area: 180, Floor: 38, Parking: 2 },
    { Title: "22 Hope Street Portland, OR 16540", price: 2264000, category: { id: 2, name: "Villa House" }, Bedrooms: 3, Bathrooms: 2, Area: 165, Floor: 26, Parking: 3 },
    { Title: "14 Mid Street Miami, OR 36450", price: 2264000, category: { id: 2, name: "Villa House" }, Bedrooms: 8, Bathrooms: 8, Area: 550, Floor: 3, Parking: 12 },
    { Title: "26 Old Street Miami, OR 12870", price: 2264000, category: { id: 2, name: "Villa House" }, Bedrooms: 12, Bathrooms: 15, Area: 380, Floor: 3, Parking: 14 },
    { Title: "12 Hope Street Portland, OR 12650", price: 2264000, category: { id: 2, name: "Villa House" }, Bedrooms: 10, Bathrooms: 12, Area: 860, Floor: 3, Parking: 10 },

  ]

  displayedList = this.tab;

  displayByCategory(categoryId: number) {
    console.log('hey ' + categoryId);
    this.displayedList = [];

    if (categoryId == 0) {
      this.displayedList = this.tab;
    } else {
      for (let i = 0; i < this.tab.length; i++) {
        if (this.tab[i].category.id == categoryId) {
          this.displayedList.push(this.tab[i]);

        }
      }
    }
  }
}