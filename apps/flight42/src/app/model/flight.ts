
export interface Flight {
  id: number;
  from: string;
  to: string;
  date: string; // ISO-formated string
  delayed: boolean
}

export const initialFlight: Flight = {
  id: 0,
  from: '',
  to: '',
  date: new Date().toISOString(),
  delayed: false
};

export interface FlightFilter {
  from: string;
  to: string;
}

export const initialFlightFilter: FlightFilter = {
  from: '',
  to: ''
};

const myFlight = initialFlight;

// Mutable Update
myFlight.id = 2;

// Immutable Update
const newMyFlight = {
  ...myFlight,
  id: 2
}