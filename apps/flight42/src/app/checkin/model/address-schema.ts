import { minLength, required, schema } from '@angular/forms/signals';
import { Address } from './address';

export const addressSchema = schema<Address>((path) => {
  required(path.street, { message: 'Please enter a street.' });
  required(path.postalCode, { message: 'Please enter a postal code.' });
  minLength(path.postalCode, 3, { message: 'Use at least three characters.' });
  required(path.city, { message: 'Please enter a city.' });
  required(path.country, { message: 'Please enter a country.' });
});
