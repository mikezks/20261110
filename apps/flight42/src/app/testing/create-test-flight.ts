import { Flight } from '../booking/model/flight';

export function createTestFlight(
  id: number,
  from = 'Paris',
  to = 'London',
): Flight {
  return {
    id,
    from,
    to,
    date: '2026-11-09T10:00:00Z',
    delayed: false,
  };
}
