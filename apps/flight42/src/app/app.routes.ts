import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { FlightSearch } from './booking/features/flight-search/flight-search';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'flight-search',
    component: FlightSearch
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];