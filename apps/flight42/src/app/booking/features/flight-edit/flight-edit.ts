import { firstValueFrom } from 'rxjs';
import { flightSchema } from '../../../shared/validation/flight-schema';
import { ValidationErrors } from '../../../shared/validation-errors/validation-errors';
import { Component, effect, inject, input, model, numberAttribute, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import { Flight, initialFlight } from '../../model/flight';
import { FlightService } from '../../data-access/flight-service';

@Component({
  selector: 'app-flight-edit',
  imports: [FormField, FormRoot, ValidationErrors, RouterLink],
  templateUrl: './flight-edit.html',
  styleUrl: './flight-edit.scss',
  host: { '[class.card]': 'id() > 0' },
})
export class FlightEdit {
  private readonly flightService = inject(FlightService);
  readonly id = input(0, { transform: numberAttribute });
  protected readonly flightResource = this.flightService.findByIdAsResource(this.id);
  protected readonly savedMessage = signal('');
  readonly flight = model<Flight>({ ...initialFlight });
  readonly saved = output<Flight>();
  readonly cancelled = output<void>();
  protected readonly editForm = form(this.flight, flightSchema, {
    submission: {
      ignoreValidators: 'none',
      action: () => this.save(),
    },
  });
  protected readonly saveError = signal('');

  constructor() {
    effect(() => {
      if (this.flightResource.hasValue()) {
        this.flight.set({ ...this.flightResource.value() });
        this.savedMessage.set('');
        this.saveError.set('');
      }
    });
  }

  protected async save(): Promise<void> {
    this.saveError.set('');
    this.savedMessage.set('');
    try {
      const saved = await firstValueFrom(this.flightService.save(this.flight()));
      this.flight.set({ ...saved });
      this.savedMessage.set('Flight saved.');
      this.saved.emit(saved);
    } catch {
      this.saveError.set('The flight could not be saved. Please try again.');
    }
  }
}
