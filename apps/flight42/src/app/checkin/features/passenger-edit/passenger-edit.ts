import { Component, inject, input, numberAttribute } from '@angular/core';
import { form, FormField, FormRoot, required, schema, SchemaPath, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { PassengerService } from '../../data-access/passenger-service';
import { Passenger } from '../../model/passenger';

export function validateName(
  field: SchemaPath<string>,
  allowedNames: string[],
  options: { message: string }
): void {
  validate(field, ctx =>
    allowedNames.includes(ctx.value())
      ? null
      : {
        kind: 'forbiddenName',
        message: options.message
      }
  );
}

// (3) Field Logic: validation, conditional states, metadata, ...
export const passengerSchema = schema<Passenger>(passengerPath => {
  required(passengerPath.name, {
    message: 'The Lastname is mandatory, please enter a value.'
  });
  validateName(passengerPath.name, [
    'Rodriguez', 'Hernandez', 'Lopez'
  ], {
    message: 'This name is not allowed.'
  })
});

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
  protected readonly editForm = form(
    this.passengerResource.value,
    passengerSchema,
    { submission: { action: async () => this.save() }}
  );

  protected save(): void {
    console.log({
      form: this.editForm().value(),
      resource: this.passengerResource.value()
    });
  }
}
