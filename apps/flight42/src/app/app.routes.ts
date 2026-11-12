import { Routes } from '@angular/router';
import { Home } from './core/home/home';
import { bookingRoutes } from './booking/routes/booking.routes';

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
  ...bookingRoutes,
  {
    path: '**',
    redirectTo: '/home'
  }
];