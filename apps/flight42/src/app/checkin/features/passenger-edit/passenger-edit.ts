import { Component, inject, input, linkedSignal, numberAttribute } from '@angular/core';
import { FormField, FormRoot, form, required, schema, apply, SchemaPath, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { PassengerService } from '../../data-access/passenger-service';
import { initialPassenger } from '../../model/passenger';
import { initialAddress, PassengerWithAddress } from '../../model/address';
import { addressSchema } from '../../model/address-schema';
import { AddressForm } from '../../ui/address-form/address-form';

export function validateLastname(
  field: SchemaPath<string>,
  allowedLastnames: string[],
  message: string,
): void {
  validate(field, ({ value }) =>
    allowedLastnames.includes(value())
      ? undefined
      : {
          kind: 'forbiddenLastname',
          message: message + ' Allowed last names: ' + allowedLastnames.join(', '),
        },
  );
}

export const passengerSchema = schema<PassengerWithAddress>((path) => {
  required(path.name, { message: 'Please enter a last name.' });
  validateLastname(
    path.name,
    ['Mustermann', 'Smith'],
    'The entered last name is not allowed.',
  );
  apply(path.address, addressSchema);
});

@Component({
  selector: 'app-passenger-edit',
  imports: [RouterLink, FormField, FormRoot, AddressForm],
  templateUrl: './passenger-edit.html',
  styleUrl: './passenger-edit.scss',
})
export class PassengerEdit {
  private readonly passengerService = inject(PassengerService);
  readonly id = input(0, { transform: numberAttribute });
  protected readonly passengerResource = this.passengerService.findByIdAsResource(this.id);

  private readonly passenger = linkedSignal<PassengerWithAddress>(() => ({
    ...(this.passengerResource.hasValue()
      ? this.passengerResource.value()
      : initialPassenger),
    address: { ...initialAddress },
  }));

  protected readonly editForm = form(this.passenger, passengerSchema, {
    submission: { action: async () => this.save() },
  });

  protected save(): void {
    console.log(this.editForm().value());
  }
}
