import { Routes } from '@angular/router';
import { Home } from './core/home/home';

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
    path: 'booking',
    loadChildren: () => import('./booking/routes/booking.routes')
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];