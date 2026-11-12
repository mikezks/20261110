import { Component, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PassengerService } from '../../data-access/passenger-service';
import { validatePassengerStatus } from '../../model/passenger-status-validator';
import { initialPassenger } from '../../model/passenger';
import { form, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'app-passenger-edit',
  imports: [
    // (4) UI Control: Template Binding
    FormField, FormRoot,
    RouterLink
  ],
  templateUrl: './passenger-edit.html',
  styleUrl: './passenger-edit.scss',
})
export class PassengerEdit {
  private readonly passengerService = inject(PassengerService);
  readonly id = input(0, { transform: numberAttribute });
  
  // (1) Data Model: Writable Signal
  protected readonly passengerResource = this.passengerService.findByIdAsResource(this.id);

  // (2) Field State: valid, dirty, touched, value, errors ...
  protected readonly editForm = form(this.passengerResource.value, {
    submission: { action: async () => this.save() }
  });

  protected save(): void {
    console.log({
      form: this.editForm().value(),
      resource: this.passengerResource.value()
    });
  }
}
