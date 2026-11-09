import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { About } from './core/about/about';
import { NotFound } from './core/not-found/not-found';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home, title: 'Home | Flights 42' },
  { path: 'booking', loadChildren: () => import('./booking/booking.routes') },
  { path: 'checkin', loadChildren: () => import('./checkin/checkin.routes') },
  { path: 'about', component: About, title: 'About | Flights 42' },
  { path: '**', component: NotFound, title: 'Not Found | Flights 42' },
];
