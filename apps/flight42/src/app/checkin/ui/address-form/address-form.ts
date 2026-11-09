import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Address } from '../../model/address';

@Component({
  selector: 'app-address-form',
  imports: [FormField],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {
  readonly address = input.required<FieldTree<Address>>();
}
