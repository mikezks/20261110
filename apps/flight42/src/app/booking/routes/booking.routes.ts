import { Routes } from "@angular/router";
import { FlightSearch } from "../features/flight-search/flight-search";

export const bookingRoutes: Routes = [
  {
    path: 'booking',
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearch
          }
        ]
      }
    ]
  }
]