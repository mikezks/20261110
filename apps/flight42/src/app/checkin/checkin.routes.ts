import { Routes } from '@angular/router';
import { PassengerSearch } from './features/passenger-search/passenger-search';
import { PassengerEdit } from './features/passenger-edit/passenger-edit';

const checkinRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'passenger/search' },
  { path: 'passenger/search', component: PassengerSearch, title: 'Passenger Search | Flights 42' },
  { path: 'passenger/edit/:id', component: PassengerEdit, title: 'Passenger Edit | Flights 42' },
];

export default checkinRoutes;
