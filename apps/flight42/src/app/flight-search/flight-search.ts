import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { FlightFilter, initialFlightFilter } from '../model/flight';

@Component({
  imports: [FormField],
  selector: 'app-flight-search',
  styleUrl: './flight-search.scss',
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  protected readonly searchModel = signal({
    from: 'Wien',
    to: 'Rome'
  });
  protected readonly searchForm = form(this.searchModel);
  
  constructor() {
    setTimeout(() => this.searchForm.from().value.set('Madrid'), 5_000);
  }

  search(): void {
    console.log(this.searchModel());
  }
}
