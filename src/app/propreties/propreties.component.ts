import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CategoriesService } from '../models/categories.service';
import { PropertiesService } from '../properties.service';
import { ScheduleService } from '../schedule.service'; // Import ScheduleService
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-propreties',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './propreties.component.html',
  styleUrls: ['./propreties.component.css']
})
export class PropretiesComponent implements OnInit {
  categoriesList: any[] = [];
  propertiesList: any[] = [];
  displayedList: any[] = [];
  showScheduleForm: boolean = false; // Control visibility of the form
  selectedProperty: any; // Store the selected property
  scheduleDate!: string; // Store the selected date
  scheduleTime!: string; // Store the selected time

  constructor(
    private categoriesService: CategoriesService,
    private propertiesService: PropertiesService,
    private scheduleService: ScheduleService, // Inject ScheduleService
    private http: HttpClient // Inject HttpClient
  ) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchProperties();
  }

  fetchCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (result: any[]) => {
        this.categoriesList = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  fetchProperties() {
    this.propertiesService.getAllProperties().subscribe({
      next: (result: any[]) => {
        this.propertiesList = result;
        this.displayedList = result; // Show all properties initially
        console.log("Fetched Properties:", this.propertiesList);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  displayByCategory(categoryId: string) {
    console.log("Selected Category ID:", categoryId);
    
    if (categoryId === "0") {
      this.displayedList = this.propertiesList; // Show all properties if 'All' is selected
      console.log("Displaying all properties");
    } else {
      this.displayedList = this.propertiesList.filter(property => {
        const matches = property.categoryDetails._id === categoryId; // Update to categoryDetails
        console.log(`Property ID: ${property.categoryDetails._id}, Matches: ${matches}`);
        return matches;
      });
    }

    console.log("Displayed List:", this.displayedList);
  }

  scheduleVisit(property: any) {
    this.selectedProperty = property; // Set the selected property
    this.showScheduleForm = true; // Show the scheduling form
  }

  confirmSchedule() {
    const scheduleData = {
      date: this.scheduleDate,
      time: this.scheduleTime,
      propertyId: this.selectedProperty?._id, // Ensure _id exists
    };
  
    console.log('Schedule Data:', scheduleData); // Log the data
    this.scheduleService.createSchedule(scheduleData).subscribe(
      response => {
        console.log('Schedule created successfully:', response);
        this.showScheduleForm = false; // Hide the form on success
      },
      error => {
        console.error('Error creating schedule:', error);
      }
    );
  }
  
  cancelSchedule() {
    this.showScheduleForm = false; // Hide the form if canceled
  }
}
