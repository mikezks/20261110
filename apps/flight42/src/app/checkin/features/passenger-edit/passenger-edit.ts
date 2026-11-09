import { Component, effect, inject, input, numberAttribute } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PassengerService } from '../../data-access/passenger-service';
import { validatePassengerStatus } from '../../model/passenger-status-validator';

@Component({
  selector: 'app-passenger-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './passenger-edit.html',
  styleUrl: './passenger-edit.scss',
})
export class PassengerEdit {
  private readonly passengerService = inject(PassengerService);
  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = this.passengerService.findByIdAsResource(this.id);
  protected readonly editForm = inject(NonNullableFormBuilder).group({
    id: [0], firstName: [''], name: [''], bonusMiles: [0],
    passengerStatus: ['', validatePassengerStatus(['A', 'B', 'C'])],
  });

  constructor() {
    effect(() => {
      if (this.passengerResource.hasValue()) {
        this.editForm.reset({ ...this.passengerResource.value() });
      }
    });
  }

  protected save(): void {
    if (this.editForm.valid) console.log(this.editForm.getRawValue());
  }
}
