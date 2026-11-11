import { Component, input, model, output } from '@angular/core';
import { Flight, initialFlight } from '../model/flight';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-flight-card',
  template: `
    <div
      class="card"
      [class.selected]="selected()"
    >
      <div class="card-header">
        <h2 class="card-title">
          {{ item().from }} - {{ item().to }}
        </h2>
      </div>

      <div class="card-body">
        <p>Flight No.: {{ item().id }}</p>
        <p>Date: {{ item().date | date:'dd.MM.yyyy HH:mm' }}</p>
        
        <div class="form-group">
          <button
            (click)="toggleSelection()"
            class="btn btn-default"
          >
            {{ selected() ? 'Remove' : 'Select' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class FlightCard {
  item = input.required<Flight>();
  selected = model(false);
  /* selected = input(false);
  selectedChange = output<boolean>(); */

  toggleSelection(): void {
    this.selected.update(curr => !curr);
  }
}
