import { Component, signal, WritableSignal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { FlightFilter, initialFlightFilter } from '../model/flight';

@Component({
  imports: [
    FormField, FormRoot
  ],
  selector: 'app-flight-search',
  styleUrl: './flight-search.scss',
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  protected readonly searchModel = signal({
    from: 'Hamburg',
    to: 'Graz',
  });
  protected readonly searchForm = form(this.searchModel, path => {
    required(path.from);
  },  {
    submission: { action: async () => this.search() }
  });
  
  constructor() {
    setTimeout(() => this.searchForm.from().value.set('Madrid'), 5_000);
  }

  search(): void {
    console.log(this.searchModel());
  }
}
