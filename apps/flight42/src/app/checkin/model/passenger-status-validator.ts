import { ValidatorFn } from '@angular/forms';

export function validatePassengerStatus(allowed: string[]): ValidatorFn {
  return control => {
    const value: unknown = control.value;
    return typeof value === 'string' && value && !allowed.includes(value)
      ? { passengerStatus: { validStatus: allowed } }
      : null;
  };
}
