import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { PassengerService } from '../../data-access/passenger-service';
import { Passenger, PassengerFilter } from '../../model/passenger';

@Component({
  selector: 'app-passenger-search',
  imports: [FormField, FormRoot, RouterLink],
  templateUrl: './passenger-search.html',
  styleUrl: './passenger-search.scss',
})
export class PassengerSearch {
  private readonly passengerService = inject(PassengerService);
  protected readonly searchModel = signal<PassengerFilter>({ firstname: '', lastname: 'Smith' });
  protected readonly searchForm = form(this.searchModel, {
    submission: { action: async () => this.search() },
  });
  protected readonly query = signal<PassengerFilter | undefined>(undefined);
  protected readonly passengers = this.passengerService.findAsResource(this.query);
  protected readonly selectedId = signal<number | undefined>(undefined);

  protected search(): void {
    const firstname = this.searchModel().firstname.trim();
    const lastname = this.searchModel().lastname.trim();
    if (!firstname && !lastname) return;
    this.selectedId.set(undefined);
    this.query.set({ firstname, lastname });
  }

  protected select(passenger: Passenger): void {
    this.selectedId.update(id => id === passenger.id ? undefined : passenger.id);
  }
}
