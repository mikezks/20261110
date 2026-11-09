import { StatusFilterPipe } from './status-filter-pipe';
import { Flight } from '../../booking/model/flight';

describe('StatusFilterPipe', () => {
  it('filters without mutating the source or losing entry references', () => {
    const flights: Flight[] = [
      { id: 1, from: 'Graz', to: 'Hamburg', date: '2026-11-09T10:00:00Z', delayed: false },
      { id: 2, from: 'Graz', to: 'Hamburg', date: '2026-11-09T11:00:00Z', delayed: true },
    ];
    const pipe = new StatusFilterPipe();
    const delayed = pipe.transform(flights, true);
    expect(delayed).toEqual([flights[1]]);
    expect(delayed[0]).toBe(flights[1]);
    expect(flights.length).toBe(2);
    expect(pipe.transform(flights, false)).toBe(flights);
    expect(pipe.transform([], true)).toEqual([]);
  });
});
