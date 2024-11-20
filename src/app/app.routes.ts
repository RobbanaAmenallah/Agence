import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PropretiesComponent } from './propreties/propreties.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { authGuard, notauthGuard } from './guards/auth.guard';
import { Ammar404Component } from './ammar404/ammar404.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'contact-us',
        component: ContactUsComponent,
    },
    {
        path: 'propreties',
        component: PropretiesComponent,
    },
    {
        path: 'property-details',
        component: PropertyDetailsComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate : [notauthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate : [notauthGuard],
    },
    {
        path: 'schedule-visit',
        component: ScheduleComponent,
        canActivate : [authGuard],
    },
    {
        path : '**',
        component : Ammar404Component,
    }
];
