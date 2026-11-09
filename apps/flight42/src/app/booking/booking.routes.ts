import { Routes } from '@angular/router';
import { FlightSearch } from './features/flight-search/flight-search';
import { FlightEdit } from './features/flight-edit/flight-edit';

const bookingRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'flight-search' },
  { path: 'flight-search', component: FlightSearch, title: 'Flight Search | Flights 42' },
  { path: 'flight-edit/:id', component: FlightEdit, title: 'Flight Edit | Flights 42' },
];

export default bookingRoutes;
