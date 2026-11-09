import { Passenger } from './passenger';

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export const initialAddress: Address = {
  street: '',
  postalCode: '',
  city: '',
  country: '',
};

export type PassengerWithAddress = Passenger & { address: Address };
